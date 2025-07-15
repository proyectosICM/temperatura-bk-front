import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "../services/userService";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });
};

export const useGetAllUsersPaginated = (page, size) => {
  return useQuery({
    queryKey: ["users", "paginated", page, size],
    queryFn: () => userService.getAllUsersPaginated(page, size),
    keepPreviousData: true,
  });
};

export const useGetUsersByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["users", "by-company", companyId],
    queryFn: () => userService.getUsersByCompanyId(companyId),
    enabled: !!companyId,
  });
};

export const useGetUsersByCompanyIdPaginated = (companyId, page, size) => {
  return useQuery({
    queryKey: ["users", "by-company-paginated", companyId, page, size],
    queryFn: () => userService.getUsersByCompanyIdPaginated(companyId, page, size),
    enabled: !!companyId,
    keepPreviousData: true,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }) =>
      userService.updateUser(id, userData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user", id] });
    },
  });
};
