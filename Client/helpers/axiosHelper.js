import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL;

// a los get no se les puede mandar dara, por lo que le damos a la data un valor base null para que no rumpa en el caso de no venir data; Y en el caso de los headers, un objeto vacío
export const fetchData = async (url, method, data=null, headers={}) => {
  try {
    // axios también funciona trabajando con una configuración que determinará si es put, get, si lleva datos, etc.
    const config = {
      method,
      url:apiUrl+url,
      headers,
      data
    }
    const response = await axios(config)
    return response.data;

  } catch (error) {
    throw error;
  }
}

// Cuando usamos la función creada en helpers fetchData para mandar los datos. Le pasamos los paránetros siguientes:

        // 1. cadena de texto que continua a la url base
        // 2. el método (put, get...) como cadena de texto 
        // 3. data 
        // 4. headers