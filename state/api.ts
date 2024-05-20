// api.ts
import axios from "axios";
import { Car } from "./slices/carsSlice";

// Base URL of your API
const API_URL = 'https://localhost:3005';

// Example function to handle errors
const handleError = (error: any) => {
  console.error("API request failed:", error);
  throw new Error("API request failed");
};


//USER


// Function to create a new user
export const createUser = async (userData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to authenticate and login a user
export const loginUser = async (userData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchUserHome = async (userId) => {
  //const token = await getToken();
  const response = await axios.get(`${API_URL}/user/${userId}/home`, {
    headers: {
      //Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

////CARS

// Function to get cars
export const getCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a car to the database
export const addCarToDatabase = async (car: Car): Promise<Car> => {
    try {
      const response = await axios.post(`${API_URL}/cars`, car);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };


  ////LOYALTY REWARDS

  export const toggleLoyaltyReward = async (rewardId) => {
    //const token = await getToken();
    const response = await axios.patch(`${API_URL}/loyalty-rewards/${rewardId}`, {}, {
      headers: {
       // Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

////LOCATIONS

export const fetchLocation = async (locationId) => {
  const response = await axios.get(`${API_URL}/locations/${locationId}`);
  return response.data;
};

export const getDistance = async (data) => {
  //const token = await getToken();
  const response = await axios.post(`${API_URL}/distance`, data, {
    headers: {
     // Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getDistances = async (data) => {
  //const token = await getToken();
  const response = await axios.post(`${API_URL}/distances`, data, {
    headers: {
    //  Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

////MEMBERSHIP

export const fetchMembershipTypes = async () => {
  const response = await axios.get(`${API_URL}/membership-types`);
  return response.data;
};

export const createMembership = async (userId, membershipTypeId) => {
 // const token = await getToken();
  const response = await axios.post(`${API_URL}/user/${userId}/membership`, { membershipTypeId }, {
    headers: {
    //  Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteMembership = async (userId) => {
 // const token = await getToken();
  await axios.delete(`${API_URL}/user/${userId}/membership`, {
    headers: {
    //  Authorization: `Bearer ${token}`
    }
  });
};