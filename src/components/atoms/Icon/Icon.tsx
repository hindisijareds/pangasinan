import type { SVGProps } from "react";

export type IconName =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "close"
  | "menu"
  | "search";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, React.ReactNode> = {
  "arrow-left": <path d="m15 18-6-6 6-6M9 12h10" />,
  "arrow-right": <path d="m9 18 6-6-6-6M5 12h10" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  search: <path d="m20 20-4.5-4.5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />,
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {paths[name]}
      </g>
    </svg>
  );
}
