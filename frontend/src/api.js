import axios from "axios";
// import { TOKEN_STORAGE_ID } from "./App.js";

const BASE_URL = process.env.BASE_URL || "/api";



export default class JoblyApi {
  static async request(
    endpoint,
    params = {},
    verb = "get",
    allowAnonymous = true
  ) {
    // let _token =localStorage.getItem(TOKEN_STORAGE_ID)

    console.debug("API Call:", endpoint, params, verb);

    let q;

    // if (allowAnonymous !== true){
    //   axios.defaults.headers.common = {'Authorization': `Bearer ${_token}`};
    // }

    axios.defaults.headers.common = { "Content-Type": "application/json" };

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, {params: { ...params } });
    } else if (verb === "post") {
      q = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
    } else if (verb === "patch") {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  // static async getCompanies(name) {
  //   let res = await this.request("companies", { name });
  //   return res.companies;
  // }

  // static async getJobs(title) {
  //   let res = await this.request("jobs", { title });
  //   return res.jobs;
  // }

  // static async applyToJob(username, id) {
  //   let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
  //   return res.message;
  // }

  //AUTH ROUTES

  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res;
  }

  static async register(data) {
    let res = await this.request(`register`, data, "post");
    return res;
  }

  //USER ROUTES

  static async getCurrentUser(userId) {
    let res = await this.request("user", { userId });
    return res;
  }

  // static async saveProfile(username, data) {
  //   let res = await this.request(`users/${username}`, data, "patch");
  //   return res.user;
  // }

  //HOUSEHOLD ROUTES

  static async getUserHouseholds(userId) {
    let res = await this.request("households", { userId });
    return res;
  }

  static async getHousehold(householdId) {
    let res = await this.request("household", { householdId });
    return res;
  }

  static async createHousehold(data) {
    let res = await this.request("household", data, "post");
    return res;
  }

  static async updateHousehold(data) {
    let res = await this.request("household", data, "patch");
    return res;
  }

  static async deleteHousehold(data) {
    let res = await this.request("household/delete", data, "post");
    return res;
  }
}