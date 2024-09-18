import { Box } from "@mui/material";
import { LuDot } from "react-icons/lu";
import { logData } from "../../../../../data/healthRecord";

interface IProps {
  item: any[];
}

interface LogEntryProps {
  date: string;
  time: string;
  title: string;
  author: string;
}

const LogEntry = ({ date, time, title, author }: LogEntryProps) => (
  <Box className="border-l-[1px] border-l-neu-300 h-full first:pt-4 pb-6 mx-2 px-3 text-left">
    <p className="text-xs font-normal text-neu-400 pb-1">
      {date} • {time}
    </p>
    <Box className="relative text-base font-semibold text-neu-900">
      <LuDot className="text-neu-400 absolute -left-[27px]" size={28} />
      <p>{title}</p>
    </Box>
    <Box className="text-sm font-normal text-neu-700 flex items-center gap-1">
      <img src="/src/assets/avi.png" alt="" className="w-4 h-4" />
      <p>{author}</p>
    </Box>
  </Box>
);

export const RecordActivityLog = ({ item }: IProps) => {
  console.log("item clicked", item);

  return (
    <Box className="bg-neu-100 rounded-lg px-4 min-h-56">
      {logData.map((log, index) => (
        <LogEntry
          key={index}
          date={log.date}
          time={log.time}
          title={log.title}
          author={log.author}
        />
      ))}
    </Box>
  );
};
