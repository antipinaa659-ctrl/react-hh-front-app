import { useMutation } from "@tanstack/react-query";
import { post } from "./api";
import type { CreateVacancyInput } from "../lib/types";

export const useCreateVacancy = () => {
  return useMutation({
    mutationFn: (input: CreateVacancyInput) =>
      post<CreateVacancyInput, number>(`/vacancy/${input.userId}/create`, input),
  });
};