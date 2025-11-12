import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getAuthToken, getUserData, signOut as authSignOut } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useState({
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });

  // Restaurar sesión al iniciar la app
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await getAuthToken();
        const userData = await getUserData();

        dispatch({
          type: 'RESTORE_TOKEN',
          token,
          user: userData,
        });
      } catch (e) {
        console.error('Error restaurando token:', e);
        dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    state,
    signIn: () => {
      dispatch({ type: 'SIGN_IN' });
    },
    signOut: useCallback(async () => {
      try {
        await authSignOut();
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Error durante sign out:', error);
      }
    }, []),
    updateUser: (user) => {
      dispatch({ type: 'UPDATE_USER', user });
    },
    setToken: (token, user) => {
      dispatch({ type: 'SET_TOKEN', token, user });
    },
  };

  // Reducer para manejar acciones
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
          user: null,
        };
      case 'SET_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'UPDATE_USER':
        return {
          ...prevState,
          user: {
            ...prevState.user,
            ...action.user,
          },
        };
      default:
        return prevState;
    }
  };

  // Usar reducer
  const [finalState, finalDispatch] = React.useReducer(reducer, state);

  return (
    <AuthContext.Provider value={{ state: finalState, dispatch: finalDispatch, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};