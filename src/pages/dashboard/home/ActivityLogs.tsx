import { Box } from "@mui/material";
import { EmptyPinnedIcon } from "../../../assets/Icons/emptyState";
import { Link } from "react-router-dom";
import { LogEntry } from "../serviceUsers/Health/ActivityLog";
import { logData } from "../../../data/healthRecord";
import { useState } from "react";
import { Spinner } from "../../../components/Spinner";

export const PinnedActivityLogs = () => {
  const [isLoading] = useState(false);
  return (
    <Box className="w-[282px] min-h-[228px] rounded-xl border-neu-50 border-[1px] mt-4">
      <h2
        className="text-[1.125rem] font-semibold leading-6
       text-neu-900 border-b-[1px] border-neu-50 p-4"
      >
        Pinned Activities
      </h2>
      <Box className="p-4">
        {logData.length > 0 ? (
          logData.map((log: any, index: number) => (
            <LogEntry
              key={index}
              date={log.date}
              title={log.title}
              author={log.author}
              isDashboard
            />
          ))
        ) : isLoading ? (
          <p className="text-center"><Spinner title='Fetching Logs...'/></p>
        ) : (
          <EmptyPinnedState />
        )}
      </Box>
    </Box>
  );
};

function EmptyPinnedState() {
  return (
    <Box className="flex flex-col justify-between items-center h-[196px]">
      <EmptyPinnedIcon />
      <Box className="flex flex-col gap-3 h-14">
        <p className="text-neu-900 text-[.875rem] font-medium leading-5">
          No pinned activity yet
        </p>
        <Link
          to={"/dashboard/monitoring"}
          className="text-pri-600 text-base leading-6 font-semibold"
        >
          Got to Activity Log
        </Link>
      </Box>
    </Box>
  );
}
