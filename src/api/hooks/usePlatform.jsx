import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as platformService from "../services/platformService";

export const useGetPlatformById = (id) => {
  return useQuery({
    queryKey: ["platform", id],
    queryFn: () => platformService.getById(id),
    enabled: !!id,
  });
};

export const useGetAllPlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: platformService.getAllPlatforms,
  });
};

export const useGetAllPlatformsPaginated = (page, size) => {
  return useQuery({
    queryKey: ["platforms", "paginated", page, size],
    queryFn: () => platformService.getAllPlatformsPaginated(page, size),
    keepPreviousData: true,
  });
};

export const useGetPlatformsByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["platforms", "by-company", companyId],
    queryFn: () => platformService.getPlatformByCompanyId(companyId),
    enabled: !!companyId,
  });
};

export const useGetPlatformsByCompanyIdPaginated = (companyId, page, size) => {
  return useQuery({
    queryKey: ["platforms", "by-company-paginated", companyId, page, size],
    queryFn: () => platformService.getPlatformByCompanyIdPaginated(companyId, page, size),
    enabled: !!companyId,
    keepPreviousData: true,
  });
};

export const useCreatePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: platformService.createPlatform,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
};

export const useUpdatePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, platformData }) =>
      platformService.updatePlatform(id, platformData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["platform", id] });
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
};

export const useDeletePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: platformService.deletePlatform,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      queryClient.removeQueries({ queryKey: ["platform", id] });
    },
  });
};
