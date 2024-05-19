import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class UserQueries extends SuperQueries {
  static baseUrl = super.baseUrl + "auth/";

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
}
