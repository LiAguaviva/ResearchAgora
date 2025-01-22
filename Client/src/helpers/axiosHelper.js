/* eslint-disable no-useless-catch */
import axios from 'axios';
const apiUrl = import.meta.env.VITE_SERVER_URL;
const apiUrl2 = import.meta.env.VITE_SERVER_URL2;

export const fetchData = async (url, method, data = null, headers={}) => {
    try {
        const config = {
            method,
            url:apiUrl+url,
            headers,
            data
        }
        const response = await axios(config);        
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchDataValidation = async (url, method, data = null, headers={}) => {
    try {
        const config = {
            method,
            url:url,
            headers,
            data
        }
        const response = await axios(config);        
        return response.data
    } catch (error) {
        throw error
    }
}


//

export const fetchData2 = async (url, method, data = null, headers={}) => {
    try {
        const config = {
            method,
            url:apiUrl2+url,
            headers,
            data
        }
        const response = await axios(config);        
        return response.data
    } catch (error) {
        throw error
    }
}