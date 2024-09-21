import { Box } from "@mui/material";
import { LuDot } from "react-icons/lu";
import { useGetHealthHistoryLog } from "../../../../../api/HealthServiceUser/clinicalNotes";
import { useFormatDate } from "../../../../../Utils/dateToText";

interface IProps {
  id: string | undefined;
}

interface LogEntryProps {
  date: string;

  title: string;
  author: string;
}

const LogEntry = ({ date, title, author }: LogEntryProps) => (
  <Box className="border-l-[1px] border-l-neu-300 h-full first:pt-4 pb-6 mx-2 px-3 text-left">
    <p className="text-xs font-normal text-neu-400 pb-1">
      {useFormatDate({ date })}
      {/* • {time} */}
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

export const RecordActivityLog = ({ id }: IProps) => {
  const { data, isLoading } = useGetHealthHistoryLog(id as string);

  const logHistoryData =
    data?.data?.map((el: any) => ({
      date: el?.date_created,
      title: el?.logged_message,
      author: el?.pillar_tenet_name,
    })) || [];

  return (
    <Box className="bg-neu-100 rounded-lg px-4 min-h-56">
      {logHistoryData.length > 0 ? (
        logHistoryData.map((log: any, index: number) => (
          <LogEntry
            key={index}
            date={log.date}
            title={log.title}
            author={log.author}
          />
        ))
      ) : isLoading ? (
        <p className="text-center">Fetching History...</p>
      ) : (
        <p className="text-center">No activity recorded!</p>
      )}
    </Box>
  );
};
