import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all"

/**
 * Fetches all countries from the Rest Countries API.
 * 
 * @returns {Promise<Object[]>} A promise that resolves to an array of country objects.
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }