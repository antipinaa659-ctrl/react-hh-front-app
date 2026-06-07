import { useQuery } from "@tanstack/react-query";
import type { VacancyModel } from "../lib/types";
import { api } from "./api";

export const VacanciesQueryKey = ["VacanciesQueryKey"] as const;

export const useGetVacancies = () => {
  return useQuery({
    queryKey: VacanciesQueryKey,
    queryFn: () => api<Array<VacancyModel>>("/vacancy/all"),
  });
};