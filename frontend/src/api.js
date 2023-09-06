import axios from "axios";
const BASE_URL = process.env.BASE_URL || "/api";



export default class CapstoneApi {
  static async request(
    endpoint,
    params = {},
    verb = "get"
  ) {


    console.debug("API Call:", endpoint, params, verb);

    let q;

    axios.defaults.headers.common = { "Content-Type": "application/json" };

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, { params: { ...params } });
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

  static async saveProfile(username, data) {
    let res = await this.request(`user/${username}`, data, "patch");
    return res.user;
  }

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

  // SELLER'S EXPERTISE ROUTES

  static async getSellerExpertise(householdId) {
    let res = await this.request("sellerExpertise", { householdId });
    return res;
  }

  static async createSellerExpertise(data) {
    let res = await this.request("sellerExpertise", data, "post");
    return res;
  }

  static async updateSellerExpertise(data) {
    let res = await this.request("sellerExpertise", data, "patch");
    return res;
  }

  static async deleteSellerExpertise(data) {
    let res = await this.request("sellerExpertise/delete", data, "post");
    return res;
  }

  // OWNERSHIP / OCCUPANCY ROUTES

  static async getOwnershipOccupancy(householdId) {
    let res = await this.request("ownershipOccupancy", { householdId });
    return res;
  }

  static async createOwnershipOccupancy(data) {
    let res = await this.request("ownershipOccupancy", data, "post");
    return res;
  }

  static async updateOwnershipOccupancy(data) {
    let res = await this.request("ownershipOccupancy", data, "patch");
    return res;
  }

  static async deleteOwnershipOccupancy(data) {
    let res = await this.request("ownershipOccupancy/delete", data, "post");
    return res;
  }

  // ASSOCIATIONS ROUTES

  static async getAssociations(householdId) {
    let res = await this.request("associations", { householdId });
    return res;
  }

  static async createAssociations(data) {
    let res = await this.request("associations", data, "post");
    return res;
  }

  static async updateAssociations(data) {
    let res = await this.request("associations", data, "patch");
    return res;
  }

  static async deleteAssociations(data) {
    let res = await this.request("associations/delete", data, "post");
    return res;
  }

  // ROOF ROUTES

  static async getRoof(householdId) {
    let res = await this.request("roof", { householdId });
    return res;
  }

  static async createRoof(data) {
    let res = await this.request("roof", data, "post");
    return res;
  }

  static async updateRoof(data) {
    let res = await this.request("roof", data, "patch");
    return res;
  }

  static async deleteRoof(data) {
    let res = await this.request("roof/delete", data, "post");
    return res;
  }

  // BASEMENT ROUTES

  static async getBasement(householdId) {
    let res = await this.request("basement", { householdId });
    return res;
  }

  static async createBasement(data) {
    let res = await this.request("basement", data, "post");
    return res;
  }

  static async updateBasement(data) {
    let res = await this.request("basement", data, "patch");
    return res;
  }

  static async deleteBasement(data) {
    let res = await this.request("basement/delete", data, "post");
    return res;
  }

  // LOOKUP ROUTES

  static async getRoleType(roleTypeId) {
    let res = await this.request("roleType", { roleTypeId });
    return res;
  }

  static async getAssociationType(associationTypeId) {
    let res = await this.request("associationType", { associationTypeId });
    return res;
  }

  static async getFrequencyType(frequencyTypeId) {
    let res = await this.request("frequencyType", { frequencyTypeId });
    return res;
  }
}


  