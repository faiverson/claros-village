import { Checkbox } from '@/components/ui/checkbox';

export interface CVCheckboxOptionProps {
  id: string;
  value: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function CVCheckboxOption({ id, value, label, checked, onCheckedChange }: CVCheckboxOptionProps) {
  return (
    <div className="flex items-center space-x-2 group">
      <Checkbox
        id={id}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="border-primary-500 group-hover:bg-green-100 transition-colors data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500"
      />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
}
