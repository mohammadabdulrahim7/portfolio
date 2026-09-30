import React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "glass" | "outline" | "cyber";
  size?: "sm" | "md" | "lg";
  href?: string;
  asAnchor?: boolean;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      href,
      asAnchor = false,
      external = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "min-h-[40px] px-4 py-2 text-xs",
      md: "min-h-[48px] px-6 py-3 text-sm",
      lg: "min-h-[52px] px-8 py-3.5 text-base",
    }[size];

    const variantClasses = {
      primary:
        "bg-[#136199] hover:bg-ocean-deep text-white font-bold shadow-md shadow-ocean-mid/30 active:scale-[0.98] border border-white/20",
      glass:
        "glass-surface hover:bg-white/20 text-white font-medium border border-white/30 active:scale-[0.98]",
      outline:
        "border border-ocean-mid text-ocean-surface hover:bg-ocean-mid/20 font-medium active:scale-[0.98]",
      cyber:
        "bg-cp-panel border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/15 hover:border-neon-cyan font-mono uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(34,229,255,0.15)] active:scale-[0.98]",
    }[variant];

    const baseClasses = clsx(
      "inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none text-center font-display",
      sizeClasses,
      variantClasses,
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    if (asAnchor || href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-disabled={disabled}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClasses}
        disabled={disabled}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
