import api from "../axiosConfig";

const endpoint = "/companies";

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
};

export const getAllCompanies = async () => {
  try {
    const response = await api.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const  getAllCompaniesPaginated = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paginated`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated companies:", error);
    throw error;
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await api.post(`${endpoint}`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const updateCompany = async (id, companyData) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};
