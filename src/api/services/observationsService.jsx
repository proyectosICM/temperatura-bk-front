import api from "../axiosConfig";

const endpoint = "/observations";

export const getTodayObservationCountByCompany = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/count-today/${companyId}`);
    return response.data; // devuelve el número
  } catch (error) {
    console.error("Error fetching today's observation count:", error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching observation by ID:", error);
    throw error;
  }
};

export const getObservationsByCompanyId = async (companyId) => {
  try {
    const response = await api.get(`${endpoint}/by-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching observations by company ID:", error);
    throw error;
  } 
};

export const getObservationsByCompanyIdPaginated = async (companyId, page, size) => {
  try {
    const response = await api.get(`${endpoint}/by-company-paginated/${companyId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated observations by company ID:", error);
    throw error;
  }
};

export const createObservation = async (observationData) => {
  try {
    const response = await api.post(endpoint, observationData);
    return response.data;
  } catch (error) {
    console.error("Error creating observation:", error);
    throw error;
  }
};

export const deleteObservation = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting observation:", error);
    throw error;
  }
};
