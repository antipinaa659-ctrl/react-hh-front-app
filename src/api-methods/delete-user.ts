import { useMutation } from "@tanstack/react-query";
import { del } from "../api";

//вызывает удаление метода 
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: number) =>
      del<boolean>(`/auth/delete/${userId}`),
  });
};