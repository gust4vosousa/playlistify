export interface IInputProps {
  label?: string;
  placeholder?: string
  value: string;
  onSubmit?: () => void;
  onChange: (value: string) => void;
}
