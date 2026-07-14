import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "lead";
  component?: React.ElementType;
  gradient?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", component, gradient = false, ...props }, ref) => {
    let Component = component || (variant === "lead" ? "p" : variant);

    const variants = {
      h1: "text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl",
      h2: "text-3xl font-bold tracking-tight sm:text-4xl",
      h3: "text-2xl font-bold tracking-tight sm:text-3xl",
      h4: "text-xl font-bold tracking-tight",
      h5: "text-lg font-bold tracking-tight",
      h6: "text-base font-bold tracking-tight",
      p: "text-base leading-7 text-muted-foreground",
      span: "text-base",
      lead: "text-xl text-muted-foreground",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          variants[variant as keyof typeof variants],
          gradient && "text-gradient",
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
