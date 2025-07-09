import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import React from "react";
import { SocialIcons } from "@/components/svg/icons";
import { Label } from "@/components/ui/label";

// Type of each icon item
type IconOption = {
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export function IconPicker({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);

  const selectedIcon = SocialIcons.find((icon) => icon.name === value);

  return (
    <div className="flex flex-col gap-2">
      <Label>Icon</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              {selectedIcon ? <selectedIcon.Icon className="w-4 h-4" /> : null}
              {selectedIcon?.name ?? "Select icon..."}
            </div>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search icon..." />
            <CommandList>
              <CommandEmpty>No icon found.</CommandEmpty>
              <CommandGroup>
                {SocialIcons.map((icon) => (
                  <CommandItem
                    key={icon.name}
                    value={icon.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === icon.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <icon.Icon className="mr-2 h-4 w-4" />
                    {icon.name}
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
