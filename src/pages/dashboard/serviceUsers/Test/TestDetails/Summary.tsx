import { Box } from "@mui/material";
import { FaFile } from "react-icons/fa6";
import { useFormatDate } from "../../../../../Utils/dateToText";

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <Box className="h-[48px]">
    <p className="text-sm font-normal text-neu-500 leading-5">{label}</p>
    <p className="text-base font-semibold text-neu-900 leading-6">{value}</p>
  </Box>
);

export const Summary = ({ data }: any) => {
  const newDate = useFormatDate(data?.test_date);
  return (
    <Box className="flex flex-col justify-between p-6 w-[582px] h-[316px] bg-bg2">
      <SummaryItem label="Date of test" value={newDate} />
      <SummaryItem label="Ordered by" value={data?.ordered_by} />
      <SummaryItem label="Collection site" value={data?.collection_site} />
      {data.document_id !== null && (
        <SummaryItem
          label="Attachment"
          value={
            <div className="flex gap-2 items-center">
              <FaFile /> <span>labscan.tst</span>
            </div>
          }
        />
      )}
    </Box>
  );
};
