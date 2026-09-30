import React from "react";
import { clsx } from "clsx";

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "deep";
  children?: React.ReactNode;
  as?: React.ElementType;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  variant = "standard",
  className,
  children,
  as: Component = "div",
  ...props
}) => {
  const surfaceClass = variant === "deep" ? "glass-surface-deep" : "glass-surface";

  return (
    <Component
      className={clsx(
        surfaceClass,
        "relative transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
