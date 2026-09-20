import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("mx-auto w-full max-w-content px-6 md:px-10 lg:px-16", className)}
      {...props}
    />
  );
}
