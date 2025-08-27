"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DropdownItem = {
  value: string;
  label: string;
  icon?: React.ReactNode | string; // <Svg /> or "/path/icon.svg"
};

type ButtonDropdownProps = {
  className?: string;
  contentClassName?: string;
  placeholder?: string;
  items?: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  iconPosition?: "start" | "end"; // "start" => icon before text, "end" => after text
};

export function ButtonDropdown({
  className,
  contentClassName,
  placeholder = "Select...",
  items = [],
  value: controlledValue,
  onChange,
  iconPosition = "start",
}: ButtonDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState("");

  const value = controlledValue ?? uncontrolledValue;

  const setValue = (v: string) => {
    if (onChange) onChange(v);
    else setUncontrolledValue(v);
  };

  const selectedItem = items.find((i) => i.value === value);

  const renderIcon = (icon?: DropdownItem["icon"]) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <img src={icon} alt="" className="h-4 w-4 shrink-0" />;
    }
    return <span className="[&>svg]:h-4 [&>svg]:w-4 shrink-0">{icon}</span>;
  };

  // Trigger content: label on the left, optional icon based on position, chevron on far right
  const TriggerLabel = () => (
    <span className="flex min-w-0 items-center gap-2">
      {iconPosition === "start" && renderIcon(selectedItem?.icon)}
      <span className="truncate">{selectedItem?.label ?? placeholder}</span>
      {iconPosition === "end" && renderIcon(selectedItem?.icon)}
    </span>
  );

  return (
    <div className={cn(className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an option"
            className={cn("w-full justify-between", className)}
          >
            <TriggerLabel />
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={cn("w-full p-0", contentClassName)}>
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {/* Row layout: label (always left), optional icon (placed by prop), check (always far right) */}
                    <div className="flex w-full items-center">
                      {/* left block: text + optional leading icon */}
                      <div className="min-w-0 flex flex-1 items-center gap-2">
                        {iconPosition === "start" && renderIcon(item.icon)}
                        <span className="truncate">{item.label}</span>
                        {iconPosition === "end" && renderIcon(item.icon)}
                      </div>

                      {/* right block: check */}
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
