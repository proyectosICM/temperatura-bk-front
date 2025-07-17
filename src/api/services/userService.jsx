import api from "../axiosConfig";

const endpoint = "/users";
const AUTH_API = "http://telemetriaperu.com:7079";

export const login = async ({ username, password }) => {
  const response = await api.post(`${AUTH_API}/login`, { username, password });
  return response.data;
};

export const getRoles = async () => {
  try {
    const response = await api.get(`${endpoint}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`${endpoint}/by-username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getAllUsersPaginated = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paginated`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    throw error;
  }
};

export const getUsersByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by company ID:", error);
    throw error;
  }
};

export const getUsersByCompanyIdPaginated = async (companyId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-company-paginated/${companyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated users by company ID:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post(`${endpoint}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
