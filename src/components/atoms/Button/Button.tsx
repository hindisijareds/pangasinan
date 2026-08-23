import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

interface SharedProps {
  children: ReactNode;
  className?: string;
  iconOnly?: boolean;
  variant?: Variant;
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = SharedProps & {
  href: string;
  "aria-label"?: string;
};

function classNames(variant: Variant, iconOnly?: boolean, className?: string) {
  return [styles.button, styles[variant], iconOnly && styles.iconOnly, className]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, className, iconOnly, variant = "primary" } = props;
  const classes = classNames(variant, iconOnly, className);

  if ("href" in props && props.href) {
    return (
      <Link aria-label={props["aria-label"]} className={classes} href={props.href}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;
  return (
    <button
      aria-controls={buttonProps["aria-controls"]}
      aria-expanded={buttonProps["aria-expanded"]}
      aria-label={buttonProps["aria-label"]}
      className={classes}
      disabled={buttonProps.disabled}
      id={buttonProps.id}
      onClick={buttonProps.onClick}
      type={buttonProps.type ?? "button"}
    >
      {children}
    </button>
  );
}
