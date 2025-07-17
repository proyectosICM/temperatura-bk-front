import api from "../axiosConfig";

const endpoint = "/platforms";

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching platform by ID:", error);
    throw error;
  }
};

export const getAllPlatforms = async () => {
  try {
    const response = await api.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
};

export const getAllPlatformsPaginated = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paginated`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated platforms:", error);
    throw error;
  }
};

export const getPlatformByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching platforms by company ID:", error);
    throw error;
  }
};

export const getPlatformByCompanyIdPaginated = async (companyId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-company-paginated/${companyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated platforms by company ID:", error);
    throw error;
  }
};

export const createPlatform = async (platformData) => {
  try {
    const response = await api.post(`${endpoint}`, platformData);
    return response.data;
  } catch (error) {
    console.error("Error creating platform:", error);
    throw error;
  }
};

export const updatePlatform = async (id, platformData) => {
  try {
    console.log(id, platformData)
    const response = await api.put(`${endpoint}/${id}`, platformData);
    return response.data;
  } catch (error) {
    console.error("Error updating platform:", error);
    throw error;
  }
};

export const deletePlatform = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting platform:", error);
    throw error;
  }
};
