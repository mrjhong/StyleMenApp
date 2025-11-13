import * as FileSystem from 'expo-file-system';

// IMPORTANTE: Reemplaza con tu API Key de Google AI Studio
// Consigue tu key en: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = 'TU_API_KEY_AQUI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Genera combinaciones de outfit basado en estilo y ocasión
 */
// export const generateOutfit = async (style, occasion) => {
//   const prompt = `Eres un experto asesor de moda masculina. 
  
//   El usuario quiere un outfit con estas características:
//   - Estilo: ${style}
//   - Ocasión: ${occasion}
//   - País: Colombia (considera el clima y las tiendas disponibles)
  
//   Por favor, genera 3 combinaciones de outfit completas.
  
//   Para cada outfit incluye:
//   1. Una descripción breve del look (2-3 líneas)
//   2. Lista de prendas específicas (ejemplo: "Camisa oxford azul claro", "Jeans slim fit azul oscuro")
//   3. Consejos sobre colores y fit
  
//   Responde SOLO en formato JSON con esta estructura:
//   {
//     "outfits": [
//       {
//         "description": "Descripción del outfit",
//         "items": ["Prenda 1", "Prenda 2", "Prenda 3", "Prenda 4"],
//         "tips": "Consejo sobre el outfit"
//       }
//     ]
//   }
  
//   NO incluyas markdown, solo el JSON puro.`;

//   try {
//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: prompt
//           }]
//         }],
//         generationConfig: {
//           temperature: 0.9,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 2048,
//         }
//       })
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error?.message || 'Error en la API de Gemini');
//     }

//     // Extraer el texto de la respuesta
//     const textResponse = data.candidates[0].content.parts[0].text;
    
//     // Limpiar y parsear JSON
//     const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
//     const result = JSON.parse(cleanJson);
    
//     return result;
//   } catch (error) {
//     console.error('Error generating outfit:', error);
//     throw error;
//   }
// };

/**
 * Analiza una foto de outfit y proporciona feedback
 */
// export const analyzeOutfitPhoto = async (imageUri) => {
//   try {
//     // Convertir imagen a base64
//     const base64Image = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const prompt = `Eres un experto estilista masculino. Analiza esta foto de outfit y proporciona:

//     1. Calificación general del 1-10
//     2. Análisis de la combinación de colores (¿funcionan bien juntos?)
//     3. Análisis del fit/ajuste de las prendas (muy ajustado, correcto, muy holgado)
//     4. 3-5 sugerencias específicas de mejora
    
//     Sé constructivo, honesto pero amable.
    
//     Responde SOLO en formato JSON con esta estructura:
//     {
//       "rating": 8,
//       "colorAnalysis": "Análisis de colores aquí...",
//       "fitAnalysis": "Análisis del fit aquí...",
//       "suggestions": [
//         "Sugerencia 1",
//         "Sugerencia 2",
//         "Sugerencia 3"
//       ]
//     }
    
//     NO incluyas markdown, solo el JSON puro.`;

//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [
//             { text: prompt },
//             {
//               inline_data: {
//                 mime_type: 'image/jpeg',
//                 data: base64Image
//               }
//             }
//           ]
//         }],
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 2048,
//         }
//       })
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error?.message || 'Error en la API de Gemini');
//     }

//     // Extraer y parsear respuesta
//     const textResponse = data.candidates[0].content.parts[0].text;
//     const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
//     const result = JSON.parse(cleanJson);
    
//     return result;
//   } catch (error) {
//     console.error('Error analyzing outfit photo:', error);
//     throw error;
//   }
// };

/**
 * Obtener recomendaciones de fragancias
 */
export const getFragranceRecommendations = async (preferences) => {
  const { aromas, personality, occasion, intensity, timeOfDay, budget } = preferences;
  
  const prompt = `Eres un experto perfumista. Basándote en estas preferencias:
  
  - Aromas preferidos: ${aromas.join(', ')}
  - Personalidad/Estilo: ${personality}
  - Ocasión: ${occasion}
  - Intensidad: ${intensity}
  - Horario: ${timeOfDay}
  - Presupuesto: ${budget}
  - País: Colombia
  
  Recomienda 5-8 fragancias masculinas que se ajusten a estos criterios.
  
  Para cada fragancia incluye:
  1. Nombre completo y marca
  2. Notas (salida, corazón, fondo)
  3. Descripción breve (2-3 líneas)
  4. Ocasión ideal
  5. Duración aproximada
  6. Rango de precio estimado en Colombia
  
  Responde SOLO en formato JSON:
  {
    "fragrances": [
      {
        "name": "Nombre de la fragancia",
        "brand": "Marca",
        "notes": {
          "top": ["nota1", "nota2"],
          "heart": ["nota1", "nota2"],
          "base": ["nota1", "nota2"]
        },
        "description": "Descripción",
        "idealFor": "Ocasión ideal",
        "longevity": "6-8 horas",
        "priceRange": "$150,000 - $300,000 COP"
      }
    ]
  }
  
  NO incluyas markdown, solo el JSON puro.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 3000,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en la API de Gemini');
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);
    
    return result;
  } catch (error) {
    console.error('Error getting fragrance recommendations:', error);
    throw error;
  }
};

/**
 * Generar rutina de fitness personalizada
 */
export const generateFitnessRoutine = async (userData) => {
  const { age, weight, height, goal, experience, daysPerWeek, location, equipment } = userData;
  
  const prompt = `Eres un entrenador personal experto. Crea una rutina de entrenamiento personalizada:
  
  Datos del usuario:
  - Edad: ${age} años
  - Peso: ${weight} kg
  - Altura: ${height} cm
  - Objetivo: ${goal}
  - Experiencia: ${experience}
  - Días disponibles: ${daysPerWeek} días/semana
  - Ubicación: ${location}
  ${equipment ? `- Equipo disponible: ${equipment}` : ''}
  
  Genera una rutina semanal completa con:
  1. División de grupos musculares por día
  2. 5-7 ejercicios por día
  3. Series y repeticiones específicas
  4. Tiempo de descanso entre series
  5. Consejos de progresión
  
  Responde SOLO en formato JSON:
  {
    "routine": {
      "name": "Nombre de la rutina",
      "description": "Descripción general",
      "duration": "8 semanas",
      "days": [
        {
          "day": "Lunes",
          "focus": "Pecho y Tríceps",
          "exercises": [
            {
              "name": "Press de banca",
              "sets": 4,
              "reps": "8-12",
              "rest": "90 seg",
              "notes": "Consejos de ejecución"
            }
          ]
        }
      ],
      "nutritionTips": "Consejos básicos de nutrición"
    }
  }
  
  NO incluyas markdown, solo el JSON puro.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en la API de Gemini');
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);
    
    return result;
  } catch (error) {
    console.error('Error generating fitness routine:', error);
    throw error;
  }
};