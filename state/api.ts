// api.ts
import axios, { AxiosError } from "axios";
import { Car } from "./slices/carSlice";
import axiosInstance from "./axiosConfig";
import * as SecureStore from "expo-secure-store";

// Base URL of your API
export const API_URL = "http://172.20.10.3:3005"; //'http://localhost:3005'; //'http://192.168.68.66:3005' //

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
  const token = await SecureStore.getItemAsync("token");
  const response = await axios.get(`${API_URL}/users/${userId}/home`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// CARS

// Function to get cars for a user
export const fetchUserCars = async (userId: number, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/cars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get a specific car for a user
export const fetchUserCar = async (userId: number, carId: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/cars/${carId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to add a car to the database
export const addCarToDatabase = async (userId: number, car: Car, token: string): Promise<Car> => {
  try {
    const response = await axios.post(`${API_URL}/users/cars`, car, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// LOYALTY REWARDS

export const toggleLoyaltyReward = async (userId: number, rewardId: number, isActive: boolean) => {
  console.log(userId, rewardId, isActive);
  const token = await SecureStore.getItemAsync("token");
  const response = await axios.patch(
    `${API_URL}/users/${userId}/loyalty-rewards/${rewardId}`,
    { isActive },
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const response = await axios.post<{ id: number; distance: number }[]>(`${API_URL}/distances`, { latitude, longitude }, { headers: { "Content-Type": "application/json" } });
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
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.post(
      `${API_URL}/users/${userId}/membership`,
      { membershipTypeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteMembership = async (userId: number) => {
  const token = await SecureStore.getItemAsync("token");
  try {
    await axios.delete(`${API_URL}/users/${userId}/membership`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    handleError(error);
  }
};

export const pauseMembership = async (userId: number) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.patch(`${API_URL}/users/${userId}/membership/pause`, null, {
      //CHECK IF WE HAVE THIS ENDPOINT - DUMMY FUNCTION
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const resumeMembership = async (userId: number) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.patch(`${API_URL}/users/${userId}/membership/resume`, null, {
      //CHECK IF WE HAVE THIS ENDPOINT - DUMMY FUNCTION
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
