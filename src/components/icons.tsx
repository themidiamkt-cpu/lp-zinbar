import type { IconName } from "@/data/landing-data";

import { cn } from "@/utils/cn";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const sharedProps = {
    className: cn("h-5 w-5", className),
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "mapPin":
      return (
        <svg {...sharedProps}>
          <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...sharedProps}>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17" />
        </svg>
      );
    case "menu":
      return (
        <svg {...sharedProps}>
          <path d="M5 7h14M5 12h14M5 17h10" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...sharedProps}>
          <path d="M7.2 18.8 5.5 20l.7-2.5A7.5 7.5 0 1 1 12 19.5c-1.4 0-2.6-.3-3.8-.7Z" />
          <path d="M9.6 9.4c.2-.5.5-.5.8-.5h.6c.2 0 .5.1.6.5l.6 1.5c.1.2.1.4 0 .6l-.5.8c-.1.2-.1.4 0 .6.4.7 1.1 1.5 1.9 2 .2.1.5.1.7 0l.7-.4c.2-.1.4-.1.6 0l1.5.7c.4.2.5.4.4.7l-.3 1c-.1.3-.4.5-.7.6-.5.1-1.3.2-2.2-.2a8.7 8.7 0 0 1-4.4-4.2c-.5-1-.4-1.8-.3-2.3l.2-.4Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...sharedProps}>
          <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.5l-1.6-5.3L5 10.6 10.4 9 12 3.5Z" />
          <path d="m18 3 1 2.5L21.5 6 19 7l-1 2.5L17 7l-2.5-1 2.5-.5L18 3Z" />
        </svg>
      );
    case "glass":
      return (
        <svg {...sharedProps}>
          <path d="M7 5h10l-1.4 6a4 4 0 0 1-4 3H12a4 4 0 0 1-4-3L7 5Z" />
          <path d="M12 14v5M9 19h6" />
        </svg>
      );
    case "plate":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "family":
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="8" r="2.2" />
          <circle cx="16" cy="9" r="1.8" />
          <path d="M5.5 18a3.5 3.5 0 0 1 7 0M13.5 18a2.8 2.8 0 0 1 5.5 0" />
        </svg>
      );
    case "pet":
      return (
        <svg {...sharedProps}>
          <circle cx="8" cy="8" r="1.6" />
          <circle cx="15.5" cy="7.2" r="1.6" />
          <circle cx="6.5" cy="12.5" r="1.6" />
          <circle cx="17.2" cy="12.5" r="1.6" />
          <path d="M12 18c2.3 0 4.2-1.5 4.2-3.4 0-1.5-1.3-2.8-3-3.2a4.8 4.8 0 0 0-2.4 0c-1.8.4-3 1.7-3 3.2C7.8 16.5 9.7 18 12 18Z" />
        </svg>
      );
    case "sunset":
      return (
        <svg {...sharedProps}>
          <path d="M5 17h14M7 20h10M12 6v3" />
          <path d="M8 14a4 4 0 0 1 8 0" />
          <path d="m6 10 1.6 1.2M18 10l-1.6 1.2M12 4.5h.01" />
        </svg>
      );
    case "party":
      return (
        <svg {...sharedProps}>
          <path d="M7 20h10M9 20v-6m6 6v-6M8 14h8" />
          <path d="M12 4c1.8 1.3 3 3.3 3 5.5V14H9V9.5C9 7.3 10.2 5.3 12 4Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...sharedProps}>
          <path d="m12 4 2.3 4.7 5.2.8-3.7 3.6.9 5.1L12 15.8l-4.7 2.4.9-5.1L4.5 9.5l5.2-.8L12 4Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    case "quote":
      return (
        <svg {...sharedProps}>
          <path d="M9.5 8.2A4.8 4.8 0 0 0 6 12.8V16h4v-3H8.5c0-1.6 1-3 2.5-3.8V8.2Zm7 0A4.8 4.8 0 0 0 13 12.8V16h4v-3h-1.5c0-1.6 1-3 2.5-3.8V8.2Z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...sharedProps}>
          <path d="m5.5 12.5 4.2 4 8.8-9" />
        </svg>
      );
    default:
      return null;
  }
}

