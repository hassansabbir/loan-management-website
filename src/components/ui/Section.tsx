import { cn } from "@/lib/utils";
import React from "react";
import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("section-padding relative", className)}
        {...props}
      >
        {container ? <Container>{children}</Container> : children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
