import { Icon } from "@/components/icons";

type AccordionItemProps = {
  question: string;
  answer: string;
};

export function AccordionItem({ question, answer }: AccordionItemProps) {
  return (
    <details className="group premium-panel overflow-hidden rounded-[24px] p-0 transition duration-300 hover:border-champagne/25 hover:bg-white/[0.06] open:border-champagne/25 open:bg-white/[0.06]">
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <span className="text-left text-base font-semibold text-ivory transition-colors group-hover:text-champagne">
          {question}
        </span>
        <span className="accordion-plus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-champagne transition duration-300 group-hover:border-champagne/30 group-hover:bg-champagne/10">
          <Icon name="arrowRight" className="h-4 w-4 rotate-90" />
        </span>
      </summary>
      <div className="px-5 pb-6 text-sm leading-7 text-mist/82 sm:px-6">
        <div className="ornament-line mb-5 max-w-[80px]" aria-hidden />
        {answer}
      </div>
    </details>
  );
}
