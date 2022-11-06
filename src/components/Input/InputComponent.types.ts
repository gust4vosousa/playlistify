export interface IInputProps {
  label?: string;
  value: string;
  onSubmit?: () => void;
  onChange: (value: string) => void;
}
