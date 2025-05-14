// "use client";
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: "input" | "select" | "checkbox" | "datepicker";
  inputType?: string;
  selectList?: { label: string; value: string }[];
}

export const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type = "input",
  inputType = "text",
  selectList,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {type !== "checkbox" && <FormLabel>{label}</FormLabel>}
          {type === "input" && (
            <FormControl>
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
          )}
          {type === "select" && (
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {selectList?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
          {type === "checkbox" && (
            <div className="flex items-start gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <span className="font-semibold text-gray-800">{label}</span>
                {placeholder && (
                  <span className="block text-xs text-gray-500 mt-0.5">{placeholder}</span>
                )}
              </div>
            </div>
          )}
          {type === "datepicker" && (
            <FormControl>
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={field.onChange}
                dateFormat="dd-MM-yyyy"
                placeholderText={placeholder}
                className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-base shadow-xs focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                isClearable
              />
            </FormControl>
          )}
          <FormMessage className="text-red-600 text-xs mt-1" />
        </FormItem>
      )}
    />
  );
};


