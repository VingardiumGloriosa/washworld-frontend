// api.ts
import axios from "axios";
import { Car } from "./slices/carSlice";

// Base URL of your API
const API_URL = 'http://localhost:3005'; //'http://192.168.68.66:3005' //

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error message:", error.message);
    console.error("Axios error code:", error.code);
    console.error("Axios error config:", error.config);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Axios error response data:", error.response.data);
      console.error("Axios error response status:", error.response.status);
      console.error("Axios error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Axios error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Axios error:", error.message);
    }
  } else {
    // Handle non-Axios errors
    console.error("Non-Axios error:", error);
  }

  throw new Error("API request failed");
};

// USER

export const fetchUserHome = async (userId: number) => {
  // const token = await getToken();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3Rhc0BqdXN0YXMuY29tIiwiaWF0IjoxNzE2ODIzOTUzLCJleHAiOjE3MTk0MTU5NTN9.AjIVxkXRYIFh4U49fgGm6cpbNxzND6ixFKh7UHfRO0I'
  const response = await axios.get(`${API_URL}/users/${userId}/home`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return response.data;
};

// CARS

// Function to get cars
export const getCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get cars for a user
export const fetchUserCars = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/cars`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get a specific car for a user
export const fetchUserCar = async (userId: number, carId: number) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/cars/${carId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a car to the database
export const addCarToDatabase = async (userId: number, car: Car): Promise<Car> => {
  try {
    const response = await axios.post(`${API_URL}/user/${userId}/cars`, car);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to update a car in the database
export const updateUserCar = async (userId: number, carId: number, car: Partial<Car>): Promise<Car> => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}/cars/${carId}`, car);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to delete a car from the database
export const deleteUserCar = async (userId: number, carId: number) => {
  try {
    await axios.delete(`${API_URL}/user/${userId}/cars/${carId}`);
  } catch (error) {
    handleError(error);
  }
};

// LOYALTY REWARDS

export const toggleLoyaltyReward = async (rewardId: number) => {
  // const token = await getToken();
  const response = await axios.patch(
    `${API_URL}/loyalty-rewards/${rewardId}`,
    {},
    {
      headers: {
        // Authorization: `Bearer ${token}`
      },
    }
  );
  return response.data;
};

export const fetchLoyaltyRewards = async () => {
  try {
    const response = await axios.get(`${API_URL}/loyalty-rewards`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// LOCATIONS

export const fetchLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchLocation = async (locationId: number) => {
  try {
    const response = await axios.get(`${API_URL}/locations/${locationId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const calculateDistances = async (latitude: number, longitude: number): Promise<{ id: number; distance: number }[]> => {
  try {
    const response = await axios.post<{ id: number; distance: number }[]>(`${API_URL}/distances`, { latitude, longitude }, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to calculate distances");
  }
};


// MEMBERSHIP

export const fetchMembershipTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/membership-types`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createMembership = async (userId: number, membershipTypeId: number) => {
  // const token = await getToken();
  const response = await axios.post(
    `${API_URL}/user/${userId}/membership`,
    { membershipTypeId },
    {
      headers: {
        // Authorization: `Bearer ${token}`
      },
    }
  );
  return response.data;
};

export const deleteMembership = async (userId: number) => {
  // const token = await getToken();
  await axios.delete(`${API_URL}/user/${userId}/membership`, {
    headers: {
      // Authorization: `Bearer ${token}`
    },
  });
};

