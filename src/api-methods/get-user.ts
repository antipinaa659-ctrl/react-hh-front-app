import { useQuery } from "@tanstack/react-query";
import type { UserModel } from "../types";
import { api } from "../api";

const UsersQueryKey = ["UsersQueryKey"];

export const useGetUsers = () => {
  return useQuery({
    queryKey: [UsersQueryKey],
    queryFn: () => api<Array<UserModel>>("/auth/users"),
  });
};