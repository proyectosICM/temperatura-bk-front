import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as companyService from "../services/companyService";

export const useGetCompanyById = (id) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => companyService.getById(id),
    enabled: !!id, // evita ejecutar si id es null o undefined
  });
};

export const useGetAllCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: companyService.getAllCompanies,
  });
};

export const useGetAllCompaniesPaginated = (page, size) => {
  return useQuery({
    queryKey: ["companies", "paginated", page, size],
    queryFn: () => companyService.getAllCompaniesPaginated(page, size),
    keepPreviousData: true,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, companyData }) =>
      companyService.updateCompany(id, companyData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["company", id] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.deleteCompany,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.removeQueries({ queryKey: ["company", id] });
    },
  });
};
