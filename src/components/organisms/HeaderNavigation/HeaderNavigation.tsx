"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";
import styles from "./HeaderNavigation.module.css";

const items = [
  { href: "/", label: "Discover Pangasinan" },
  { href: "/heritage", label: "Heritage collection" },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
    <header
      className={[styles.header, isHome && !open ? styles.homeHeader : ""].filter(Boolean).join(" ")}
      data-doc-component="header-navigation"
    >
      <div className={styles.bar}>
        <Button
          aria-controls="site-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className={styles.menuButton}
          id="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          type="button"
          variant="ghost"
        >
          <Icon name={open ? "close" : "menu"} />
          <span>{open ? "Close" : "Menu"}</span>
        </Button>

        <Link aria-label="Pangasinan home" className={styles.brand} href="/">
          <span aria-hidden="true" className={styles.brandMark}>P</span>
          <span className={styles.brandText}>Pangasinan</span>
        </Link>

        <Button className={styles.exploreButton} href="/heritage" variant="ghost">
          Explore places
        </Button>
      </div>

      <div className={styles.mobilePanel} hidden={!open} id="site-navigation" ref={panel}>
        <div className={styles.panelInner}>
          <p className={styles.panelEyebrow}>Explore the province</p>
          <nav aria-label="Primary navigation" className={styles.mobileNav}>
            {items.map((item, index) => (
              <NavigationItem
                active={pathname === item.href}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>{item.label}
              </NavigationItem>
            ))}
          </nav>
          <p className={styles.mobileNote}>
            Stories of land, coast, faith, and living culture across Pangasinan.
          </p>
        </div>
      </div>
    </header>
  );
}
