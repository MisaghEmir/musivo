
"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface SortOption {
  label: string;
  value: string;
}

interface ComboboxMusicProps {
  value: string;
  onValueChange: (value: string) => void;
}

const sortOptions: SortOption[] = [
  { label: "Default", value: "default" },
  { label: "Name (A-Z)", value: "az" },
  { label: "Name (Z-A)", value: "za" },
  { label: "Most Viewed", value: "most-viewed" },
  { label: "Least Viewed", value: "least-viewed" },
];

export function ComboboxMusic({
  value,
  onValueChange,
}: ComboboxMusicProps) {
  return (
    <Combobox
      items={sortOptions}
      value={sortOptions.find((item) => item.value === value) ?? sortOptions[0]}
      onValueChange={(selected) => {
        if (selected && typeof selected === "object" && "value" in selected) {
          onValueChange(String(selected.value));
        }
      }}
      itemToStringLabel={(item) => item.label}
      
    >
      <ComboboxInput placeholder="Sort by..."  className="h-full"/>

      <ComboboxContent>
        <ComboboxEmpty>No options found.</ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}