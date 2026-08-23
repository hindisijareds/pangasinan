import Link from "next/link";
import styles from "./NavigationItem.module.css";

interface NavigationItemProps {
  active?: boolean;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export function NavigationItem({ active, children, href, onClick }: NavigationItemProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={[styles.link, active && styles.active].filter(Boolean).join(" ")}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
