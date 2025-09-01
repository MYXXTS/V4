import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  content: string;
  side?: React.ComponentProps<typeof TooltipPrimitive.Content>['side'];
  children: React.ReactNode;
}

export function Tooltip({ content, side, children, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button className="inline-flex size-[35px] items-center justify-center rounded-full" {...props}>
            {children}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content side={side} className="select-none rounded bg-base-100 px-3 py-2.5 leading-none shodow shadow-xl">
            {content}
            <TooltipPrimitive.Arrow className="fill-base-300" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
