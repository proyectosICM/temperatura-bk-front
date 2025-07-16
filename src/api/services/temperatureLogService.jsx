import api from "../axiosConfig";

const endpoint = "/temperature-logs";

export const getById = async (id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const getByPlatformId = async (platformId) => {
  const response = await api.get(`${endpoint}/by-platform/${platformId}`);
  return response.data;
};

export const getByPlatformIdPaginated = async (platformId, page, size) => {
  const response = await api.get(`${endpoint}/by-platform-paginated/${platformId}`, {
    params: { page, size },
  });
  return response.data;
};

export const getByCompanyId = async (companyId) => {
  const response = await api.get(`${endpoint}/by-company/${companyId}`);
  return response.data;
};

export const getByCompanyIdPaginated = async (companyId, page, size) => {
  const response = await api.get(`${endpoint}/by-company-paginated/${companyId}`, {
    params: { page, size },
  });
  return response.data;
};

export const createLog = async (logData) => {
  const response = await api.post(endpoint, logData);
  return response.data;
};

export const deleteLog = async (id) => {
  const response = await api.delete(`${endpoint}/${id}`);
  return response.data;
};
