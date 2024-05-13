// api.ts
import axios from 'axios';
import { Car } from './slices/carsSlice';
import { User } from './slices/userSlice';



// Base URL of your API
const BASE_URL = 'https://example.com/api';

// Example function to handle errors
const handleError = (error: any) => {
  console.error('API request failed:', error);
  throw new Error('API request failed');
};

// Function to get membership types
export const getMembershipTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/membership-types`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get loyalty reward types
export const getLoyaltyRewardTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/loyalty-reward-types`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get locations
export const getLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get self wash halls
export const getSelfWashHalls = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/self-wash-halls`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get wash halls
export const getWashHalls = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wash-halls`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to create a new user
export const createUser = async (userData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };
  
  // Function to authenticate and login a user
  export const loginUser = async (userData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

// Function to get memberships
export const getMembership = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/membership`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get cars
export const getCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cars`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a car to the database
export const addCarToDatabase = async (car: Car): Promise<Car> => {
    try {
      const response = await axios.post(`${BASE_URL}/cars`, car);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

// Function to get loyalty rewards
export const getLoyaltyRewards = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/loyalty-rewards`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
