// api.ts
import axios, { AxiosError } from "axios";
import { Car } from "./slices/carSlice";
import axiosInstance from "./axiosConfig";

// Base URL of your API
export const API_URL = "http://172.20.10.3:3005";

// Example function to handle errors
const handleError = (error: AxiosError) => {
  console.error("API request failed:", error.message);
  if (error.response) {
    console.error("Response status:", error.response.status);
    console.error("Response data:", error.response.data);
  }
  throw new Error("API request failed");
};

// USER

export const fetchUserHome = async (userId: number) => {
  // const token = await getToken();
  const response = await axios.get(`${API_URL}/user/${userId}/home`, {
    headers: {
      // Authorization: `Bearer ${token}`
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

export const getDistance = async (data: { currentLocation: { latitude: number; longitude: number }; destinationLocation: { latitude: number; longitude: number } }) => {
  // const token = await getToken();
  const response = await axios.post(`${API_URL}/distance`, data, {
    headers: {
      // Authorization: `Bearer ${token}`
    },
  });
  return response.data;
};

export const getDistances = async (data: { currentLocation: { latitude: number; longitude: number }; destinationLocations: { id: number; latitude: number; longitude: number }[] }) => {
  // const token = await getToken();
  const response = await axios.post(`${API_URL}/distances`, data, {
    headers: {
      // Authorization: `Bearer ${token}`
    },
  });
  return response.data;
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

export const pauseMembership = async (userId: number) => {
  // const token = await getToken();
  const response = await axios.patch(
    `${API_URL}/user/${userId}/membership/pause`,
    {},
    {
      headers: {
        // Authorization: `Bearer ${token}`
      },
    }
  );
  return response.data;
};

export const updateMembership = async (userId: number, membershipTypeId: number) => {
  // const token = await getToken();
  const response = await axios.patch(
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
