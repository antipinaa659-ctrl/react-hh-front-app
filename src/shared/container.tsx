import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className=" p-3 bg-light shadow rounded-3">
      {children}
    </div>
  );
};
