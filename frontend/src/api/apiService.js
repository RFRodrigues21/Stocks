import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// API call to fetch securities
export const fetchSecurities = async () => {
  try {
    const response = await api.get('/securities?simple=true');

    return response.data;
  } catch (error) {
    console.error('Error fetching securities:', error);
    throw error;
  }
};

// API call to fetch security details
export const fetchSecurityDetails = async (securityId) => {
  try {
    const response = await api.get(`/securities/${securityId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for security ID ${securityId}:`, error);
    throw error;
  }
};
