import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Style from "../../components/InputField/styles.module.css";
import Styles from "./styles.module.css";

import { MdOutlineCalendarToday } from "react-icons/md";

export default function CalendarField({ value, selected, onSelect }: any) {
  const [showCalendar, setShowcalendar] = useState(false);

  return (
    <>
      <label style={{ marginTop: 10 }} htmlFor="dateOfBirth">
        Date of Birth
        <div className={Styles.wrapper}>
          <input type="text" value={value} disabled className={Style.input} />
          <div
            className={Styles.icon}
            onClick={() => setShowcalendar(!showCalendar)}
          >
            <MdOutlineCalendarToday color="#667185" />
          </div>
        </div>
      </label>
      {showCalendar && (
        <div className={Styles.calendar}>
          <DayPicker
            mode="single"
            captionLayout="dropdown"
            fromYear={1800}
            toYear={3000}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      )}
    </>
  );
}
