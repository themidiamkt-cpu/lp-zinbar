export const siteTheme = {
  panel:
    "rounded-[28px] border border-white/10 bg-white/[0.045] shadow-premium backdrop-blur-xl",
  panelStrong:
    "rounded-[30px] border border-[rgba(215,192,151,0.24)] bg-[linear-gradient(180deg,rgba(123,24,42,0.35),rgba(12,7,8,0.92))] shadow-glow backdrop-blur-xl",
  cardHover:
    "transition duration-300 ease-out hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.06]",
  line:
    "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent",
  glows: {
    wine:
      "pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-wine/30 blur-3xl",
    gold:
      "pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-champagne/10 blur-3xl",
    heroLeft:
      "pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-garnet/25 blur-3xl",
    heroRight:
      "pointer-events-none absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-champagne/10 blur-3xl",
  },
} as const;

