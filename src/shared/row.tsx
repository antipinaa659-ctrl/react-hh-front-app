import type { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
}
export const Row = ({ children }: RowProps) => {
  return (
    <div className="d-flex flex-row align-items-center gap-3 justify-content-between w-100">
      {children}
    </div>
  );
};
