import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className = '',
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`divide-y divide-[rgba(255,255,255,0.08)] border-y border-[rgba(255,255,255,0.08)] ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-2">
            <button
              onClick={() => toggle(item.id)}
              className="w-full py-4 flex items-center justify-between text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-['Space_Grotesk'] text-[12px] uppercase tracking-[0.22em] text-[#F1EDE5] group-hover:text-[#C7A66A] transition-colors">
                {item.title}
              </span>

              {/* Plus / Minus rotating line */}
              <div className="w-4 h-4 relative flex items-center justify-center text-[#C7A66A]">
                <span className="absolute w-3.5 h-[1.2px] bg-current" />
                <span
                  className={`absolute w-3.5 h-[1.2px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isOpen ? 'rotate-0 opacity-0' : 'rotate-90 opacity-100'
                  }`}
                />
              </div>
            </button>

            {/* Content Expand */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="font-['Space_Grotesk'] text-[13px] text-[#9B9A96] leading-relaxed pr-6">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
