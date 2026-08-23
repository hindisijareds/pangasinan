"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";
import styles from "./HeaderNavigation.module.css";

const items = [
  { href: "/", label: "Discover" },
  { href: "/heritage", label: "Heritage sites" },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = () => media.matches && setOpen(false);
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() =>
          document.getElementById("menu-toggle")?.focus(),
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header} data-doc-component="header-navigation">
      <div className={styles.bar}>
        <Link className={styles.brand} href="/">
          <span aria-hidden="true" className={styles.brandMark} />
          Pangasinan
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {items.map((item) => (
            <NavigationItem active={pathname === item.href} href={item.href} key={item.href}>
              {item.label}
            </NavigationItem>
          ))}
          <Button href="/heritage" variant="primary">
            Explore
          </Button>
        </nav>

        <Button
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          className={styles.menuButton}
          id="menu-toggle"
          iconOnly
          onClick={() => setOpen((value) => !value)}
          type="button"
          variant="secondary"
        >
          <Icon name={open ? "close" : "menu"} />
        </Button>
      </div>

      <div className={styles.mobilePanel} hidden={!open} id="mobile-navigation" ref={panel}>
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          {items.map((item) => (
            <NavigationItem
              active={pathname === item.href}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavigationItem>
          ))}
        </nav>
        <p className={styles.mobileNote}>
          Stories of land, coast, faith, and living culture across Pangasinan.
        </p>
      </div>
    </header>
  );
}
