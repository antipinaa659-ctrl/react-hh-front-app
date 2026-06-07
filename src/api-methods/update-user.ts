import { useMutation } from "@tanstack/react-query";
import type { CreateUserInput } from "../lib/types";
import { put } from "./api";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (input: CreateUserInput) =>
      put<CreateUserInput, number>(`/users/${input.id}`, input),
  });
};