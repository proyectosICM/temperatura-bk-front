import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as observationService from "../services/observationsService";

export const useGetTodayObservationCountByCompany = (companyId) => {
  return useQuery({
    queryKey: ["observations", "count-today", companyId],
    queryFn: () => observationService.getTodayObservationCountByCompany(companyId),
    enabled: !!companyId,
  });
};

export const useGetObservationById = (id) => {
  return useQuery({
    queryKey: ["observation", id],
    queryFn: () => observationService.getById(id),
    enabled: !!id,
  });
};

export const useGetObservationsByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["observations", "by-company", companyId],
    queryFn: () => observationService.getObservationsByCompanyId(companyId),
    enabled: !!companyId,
  });
};

export const useGetObservationsByCompanyIdPaginated = (companyId, page, size) => {
  return useQuery({
    queryKey: ["observations", "by-company-paginated", companyId, page, size],
    queryFn: () =>
      observationService.getObservationsByCompanyIdPaginated(companyId, page, size),
    enabled: !!companyId,
    keepPreviousData: true,
  });
};

export const useCreateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: observationService.createObservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observations"] });
    },
  });
};

export const useDeleteObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: observationService.deleteObservation,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["observations"] });
      queryClient.removeQueries({ queryKey: ["observation", id] });
    },
  });
};
