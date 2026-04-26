import type { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
}
export const Column = ({ children }: ColumnProps) => {
  return (
    <div className="d-flex flex-column gap-3 ">
      {children}
    </div>
  );
};
