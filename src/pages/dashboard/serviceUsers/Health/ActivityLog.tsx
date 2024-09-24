import { Box } from "@mui/material";
import { LuDot } from "react-icons/lu";
import { useGetHealthHistoryLog } from "../../../../api/HealthServiceUser/clinicalNotes";
import { useFormatDate } from "../../../../Utils/dateToText";
import classNames from "classnames";

interface IProps {
  id: string | undefined;
}

interface LogEntryProps {
  date: string;
  isDashboard?: boolean;
  title: string;
  author: string;
}

export const LogEntry = ({ date, title, author, ...rest }: LogEntryProps) => (
  <Box
    className={classNames(
      rest.isDashboard
        ? " py-3 border-b-[1px] border-b-neu-50 first:pt-0 last:border-none"
        : "border-l-[1px] border-l-neu-300 h-full first:pt-4 mx-2 pb-6 px-3 text-left"
    )}
  >
    <p className="text-xs font-normal text-neu-400 pb-1">
      {useFormatDate({ date }) === "Invalid date"
        ? date
        : useFormatDate({ date })}
    </p>
    <Box
      className={classNames(
        "text-neu-900 font-semibold",
        rest.isDashboard ? "text-[.875rem]" : "relative text-base"
      )}
    >
      {!rest.isDashboard && (
        <LuDot className="text-neu-400 absolute -left-[27px]" size={28} />
      )}
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
    <Box className="bg-neu-100 rounded-lg px-4 min-h-56 max-h-[73vh] overflow-y-auto scrollbar-hide">
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
