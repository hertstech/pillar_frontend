import Styles from "./styles.module.css";

interface TextProps {
  label: string;
  name: string;
  value: string | number;
  type: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function InputField({
  name,
  value,
  onChange,
  label,
  placeholder,
  type,
  required,
  disabled,
}: TextProps) {
  return (
    <div className={Styles.wrapper}>
      <label htmlFor={name}>
        {label}
        <input
          type={type}
          className={Styles.input}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
