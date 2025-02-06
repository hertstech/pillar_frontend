import { IoMdStar } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneProps {
  name: string;
  value: string;
  onChange?: any;
  isRequired?: boolean;
}

export default function PhoneField({
  name,
  value,
  onChange,
  isRequired,
}: PhoneProps) {
  return (
    <div>
      <label htmlFor={name}>
        {isRequired ? (
          <span className="flex items-center gap-1">
            Weight
            <IoMdStar size={10} className="text-err" />
          </span>
        ) : (
          <>Phone Number</>
        )}
        <PhoneInput
          inputProps={{
            name: name,
            required: true,
            maxLength: 19,
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
