import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://api.stylemenapp.com';

const apiClient = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


// CREAR METODO GENERALIZADO PARA PETICIONES GET
export const get = async (endpoint, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error(`GET ${endpoint} failed:`, error);
        throw error;
    }   
};

// CREAR METODO GENERALIZADO PARA PETICIONES POST
export const post = async (endpoint, data = {}) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`POST ${endpoint} failed:`, error);
        throw error;
    }   
};

// CREAR METODO GENERALIZADO PARA PETICIONES PUT
export const put = async (endpoint, data = {}) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`PUT ${endpoint} failed:`, error);
        throw error;
    }
};

// CREAR METODO GENERALIZADO PARA PETICIONES DELETE
export const del = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error(`DELETE ${endpoint} failed:`, error);
        throw error;
    }   
};

export default apiClient;
