import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { icons } from "../icons";
import { testData, testUnits, unitColors } from "../data";
import classNames from "classnames";
import { getNameByValue } from "../../../../../Utils/getByName";

interface Result {
  id: number;
  category: keyof typeof icons;
  test_types: string;
  date: string;
  reading: string;
}

interface IProps {
  data: Result[];
}

export const Results = ({ data }: IProps) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex flex-col gap-4">
      {!data || data.length === 0 ? (
        <span>No test added </span>
      ) : (
        data?.map((result) => {
          const unit = testUnits[result.test_types] || ""; 

          return (
            <Accordion
              key={result.id}
              expanded={expanded === result.id}
              onChange={handleAccordionChange(result.id)}
              className="flex flex-col justify-center gap-8  !rounded-xl !border
          !border-neu-50 !shadow-none !min-h-[84px]"
              sx={{
                "&::before": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <FaAngleDown
                    className={classNames(
                      "absolute top-5 right-2 transition-transform duration-300",
                      expanded ? "!top-4 !left-2" : "rotate-0"
                    )}
                  />
                }
                className="!max-h-[52px] !mt-7 !shadow-none"
              >
                <Box className="flex flex-col w-full gap-8">
                  <p className="flex items-center gap-2 text-sm text-neu-500 font-normal capitalize">
                    {icons[result.category]}{" "}
                    {getNameByValue(result.category, testData.category)} •{" "}
                    {result.date}
                  </p>
                  <Box className="flex justify-between items-center w-[95%]">
                    <p className="text-base font-semibold capitalize">
                      {getNameByValue(result.test_types, testData.category)}
                    </p>
                    <p className="text-base text-succ font-semibold mr-2">
                      {result.reading}{" "}
                      <span
                        className={classNames(
                          "text-sm font-normal",
                          unitColors[unit] || "text-neu-400"
                        )}
                      >
                        {unit}
                      </span>
                    </p>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails className="!border-none !shadow-none">
                Additional details for{" "}
                {getNameByValue(result.test_types, testData.category)}.
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </div>
  );
};
