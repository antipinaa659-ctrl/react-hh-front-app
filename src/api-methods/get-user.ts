import { useQuery } from "@tanstack/react-query";
import type { UserModel } from "../lib/types";
import { api } from "./api";

export const UsersQueryKey = ["UsersQueryKey"] as const;

export const useGetUsers = () => {
  return useQuery({
    queryKey: UsersQueryKey,
    queryFn: () => api<Array<UserModel>>("/users/all"),
  });
};