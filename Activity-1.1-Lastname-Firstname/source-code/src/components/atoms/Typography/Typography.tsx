import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Typography.module.css";

type TypographyVariant = "display" | "heading" | "title" | "body" | "eyebrow" | "small";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  variant?: TypographyVariant;
}

export function Typography({
  as: Component = "p",
  children,
  className,
  variant = "body",
  ...props
}: TypographyProps) {
  return (
    <Component className={[styles[variant], className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Component>
  );
}
