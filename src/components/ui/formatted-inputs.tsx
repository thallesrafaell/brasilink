import React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(
  (
    { value, onChange, placeholder = "R$ 0,00", className, disabled, ...props },
    ref
  ) => {
    return (
      <NumericFormat
        customInput={Input}
        value={value}
        onValueChange={(values) => {
          onChange?.(values.floatValue || 0);
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        placeholder={placeholder}
        className={cn(className)}
        disabled={disabled}
        getInputRef={ref}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

interface DurationInputProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  unit?: "minutes" | "hours";
}

export const DurationInput = React.forwardRef<
  HTMLInputElement,
  DurationInputProps
>(
  (
    {
      value,
      onChange,
      placeholder = "0",
      className,
      disabled,
      unit = "hours",
      ...props
    },
    ref
  ) => {
    return (
      <NumericFormat
        customInput={Input}
        value={value}
        onValueChange={(values) => {
          onChange?.(values.floatValue || 0);
        }}
        allowNegative={false}
        decimalScale={1}
        suffix={unit === "hours" ? " h" : " min"}
        placeholder={placeholder}
        className={cn(className)}
        disabled={disabled}
        getInputRef={ref}
        step={0.5}
        {...props}
      />
    );
  }
);

DurationInput.displayName = "DurationInput";
