import { Check as CheckIcon } from "@tamagui/lucide-icons";
import type { CheckboxProps } from "tamagui";
import { Checkbox, Label, XStack } from "tamagui";

export function CheckboxWithLabel({
  label,
  size,
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  const id = `checkbox-${(size || "").toString().slice(1)}`;
  return (
    <XStack alignItems="center" gap="$4">
      <Label
        size={size}
        htmlFor={id}
        style={{ fontFamily: "x10y12pxDonguriDuel" }}
      >
        {label}
      </Label>

      <Checkbox id={id} size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
    </XStack>
  );
}
