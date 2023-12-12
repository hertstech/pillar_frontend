import Styles from "./styles.module.css";

interface TextProps {
  label: string;
  name: string;
  value: string;
  type: string;
  onChange: any;
  placeholder: string;
}

export default function InputField({
  name,
  value,
  onChange,
  label,
  placeholder,
  type,
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
        />
      </label>
    </div>
  );
}
