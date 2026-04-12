import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="d-flex flex-column gap-2 p-2 bg-light shadow p-3 rounded-3">
      {children}
    </div>
  );
};
