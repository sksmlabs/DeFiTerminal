"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



type ButtonDropdownProps = {
  className?: string;                // for layout (e.g., basis-2/5, w-full)
  contentClassName?: string;         // for popover content width, etc.
  placeholder?: string;
  items?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

export function ButtonDropdown({
  className,
  contentClassName,
  placeholder = "Select framework...",
  items,
  value: controlledValue,
  onChange,
}: ButtonDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolledValue, setUncontrolledValue] = React.useState("");

  const value = controlledValue ?? uncontrolledValue;

  const setValue = (v: string) => {
    if (onChange) onChange(v);
    else setUncontrolledValue(v);
  };

  const selectedLabel = value
    ? items.find((i) => i.value === value)?.label
    : undefined;

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
            className={cn("justify-between w-full", className)}
          >
            {selectedLabel ?? placeholder}
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
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
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
