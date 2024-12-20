import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { icons } from "../icons";
import { testResults, unitColors } from "../data";
import classNames from "classnames";

export const Results = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      event.preventDefault();
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex flex-col gap-4">
      {testResults.map((result) => (
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
                className={
                  (classNames(
                    "absolute top-5 right-2 transition-transform duration-300"
                  ),
                  expanded ? "!top-4 !left-2" : "rotate-0")
                }
              />
            }
            className="!max-h-[52px] !mt-7 !shadow-none"
          >
            <Box className="flex flex-col w-full gap-8">
              <p className="flex items-center gap-2 text-sm text-neu-500 font-normal capitalize">
                {icons.blood} {result.category} • {result.date}
              </p>
              <Box className="flex justify-between items-center w-[95%]">
                <p className="text-base font-semibold capitalize">
                  {result.type}
                </p>
                <p className="text-base text-succ font-semibold mr-2">
                  {result.value}{" "}
                  <span
                    className={classNames(
                      "text-sm font-normal ",
                      unitColors[result.unit] || "text-neu-400"
                    )}
                  >
                    {result.unit}
                  </span>
                </p>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className="!border-none !shadow-none">
            Additional details for {result.type}.
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
