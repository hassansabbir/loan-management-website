import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export default Container;
