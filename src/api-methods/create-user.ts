import { useMutation } from "@tanstack/react-query";
import type { CreateUserInput } from "../lib/types";
import { post } from "./api";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (input: CreateUserInput) =>
      post<CreateUserInput, number>("/auth/create", input),
  });
};