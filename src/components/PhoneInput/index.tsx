import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneProps {
  name: string;
  value: string;
  onChange?: any;
}

export default function PhoneField({ name, value, onChange }: PhoneProps) {
  return (
    <div style={{ marginTop: 8 }}>
      <label htmlFor={name}>
        Phone Number
        <PhoneInput
          inputProps={{
            name: name,
            required: true,
            maxLength: 19,
            // autoFocus: true,
          }}
          country={"ng"}
          containerStyle={{
            border: "1px solid #d0d5dd",
            padding: "16px auto",
            width: "100%",
            height: "56px",
            borderRadius: 6,
            marginTop: 5,
          }}
          inputStyle={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
          dropdownStyle={{
            padding: "12px 12px",
          }}
          buttonStyle={{
            backgroundColor: "none",
          }}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
