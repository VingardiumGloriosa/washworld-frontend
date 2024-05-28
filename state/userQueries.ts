import axios from "axios";
import { SuperQueries } from "./SuperQueries";
import axiosInstance from "./axiosConfig";

export class UserQueries extends SuperQueries {
  static baseUrl = super.baseUrl + "/auth/";

  static async signup(username: string, email: string, password: string) {
    const response = await axios.post(`${this.baseUrl}signup`, {
      username: username,
      email: email,
      password: password,
    });

    console.log("userQueries", response.data);

    return response.data;
  }

  static async login(email: string, password: string) {
    console.log("calling...", this.baseUrl + "login");

    const response = await axios.post(this.baseUrl + "login", { email, password });
    console.log(response);

    return response.data;
  }

  static async logout() {
    console.log("calling...", this.baseUrl + "logout");

    const response = await axios.post(this.baseUrl + "logout");
    console.log(response);

    return response.data;
  }

  static async fetchUserWithToken(token: string) {
    console.log("calling...", this.baseUrl + "me");

    const response = await axios.get(this.baseUrl + "me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);

    return response.data;
  }
}
