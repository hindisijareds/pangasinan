"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useMotionNavigation } from "@/components/motion/MotionProvider/MotionProvider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function TransitionLink({ href, onClick, target, ...props }: TransitionLinkProps) {
  const { beginNavigation } = useMotionNavigation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || target === "_blank"
      || href.startsWith("#")
      || /^[a-z]+:/i.test(href)
    ) return;

    event.preventDefault();
    beginNavigation(href);
  };

  return <Link {...props} href={href} onClick={handleClick} target={target} />;
}
