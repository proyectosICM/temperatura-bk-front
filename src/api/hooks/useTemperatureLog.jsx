import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as temperatureLogService from "../services/temperatureLogService";

export const useGetTemperatureLogById = (id) =>
  useQuery({
    queryKey: ["temperature-log", id],
    queryFn: () => temperatureLogService.getById(id),
    enabled: !!id,
  });

export const useGetLogsByPlatformId = (platformId) =>
  useQuery({
    queryKey: ["temperature-logs", "by-platform", platformId],
    queryFn: () => temperatureLogService.getByPlatformId(platformId),
    enabled: !!platformId,
  });

export const useGetLogsByPlatformIdPaginated = (platformId, page, size) =>
  useQuery({
    queryKey: ["temperature-logs", "by-platform-paginated", platformId, page, size],
    queryFn: () => temperatureLogService.getByPlatformIdPaginated(platformId, page, size),
    enabled: !!platformId,
    keepPreviousData: true,
  });

export const useGetLogsByCompanyId = (companyId) =>
  useQuery({
    queryKey: ["temperature-logs", "by-company", companyId],
    queryFn: () => temperatureLogService.getByCompanyId(companyId),
    enabled: !!companyId,
  });

export const useGetLogsByCompanyIdPaginated = (companyId, page, size) =>
  useQuery({
    queryKey: ["temperature-logs", "by-company-paginated", companyId, page, size],
    queryFn: () => temperatureLogService.getByCompanyIdPaginated(companyId, page, size),
    enabled: !!companyId,
    keepPreviousData: true,
  });

export const useCreateTemperatureLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: temperatureLogService.createLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["temperature-logs"] });
    },
  });
};

export const useDeleteTemperatureLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: temperatureLogService.deleteLog,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["temperature-logs"] });
      queryClient.removeQueries({ queryKey: ["temperature-log", id] });
    },
  });
};
