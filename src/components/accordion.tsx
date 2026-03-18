import { Icon } from "@/components/icons";

type AccordionItemProps = {
  question: string;
  answer: string;
};

export function AccordionItem({ question, answer }: AccordionItemProps) {
  return (
    <details className="group premium-panel rounded-[24px] p-0 transition duration-300 hover:border-white/16">
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <span className="text-left text-base font-semibold text-ivory">{question}</span>
        <span className="accordion-plus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-champagne transition duration-300">
          <Icon name="arrowRight" className="h-4 w-4 rotate-90" />
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm leading-7 text-mist/80 sm:px-6 sm:pb-6">{answer}</div>
    </details>
  );
}

