import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { ModalMain } from "../../../../../components/Modals";
import classNames from "classnames";
import { LuDot } from "react-icons/lu";
import { FaDownload } from "react-icons/fa6";

interface PastTestModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  testId: string | undefined;
}

const PastTests: React.FC<PastTestModalProps> = ({
  open,
  setOpen,

  testId,
}) => {
  return (
    <ModalMain open={open} handleClose={() => setOpen(false)} width={590}>
      <Box className="flex flex-col gap-2 min-h-[540px]">
        <Box className="flex justify-between items-center h-[22px]">
          <h2 className="text-[.875rem] font-[400] text-neu-600 leading-5">
            Test #{testId || "Test Id here"}
          </h2>
          <p
            onClick={() => setOpen(false)}
            className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
          >
            x
          </p>
        </Box>
        <h1 className="text-lg my-2 font-[600] leading-6 h-[22px]">
          Showing past test results
        </h1>
        <Box
          className="w-full border-b-0 border border-neu-50 rounded-t-lg
      min-h-[500px] flex justify-between px-4"
        >
          <Box
            className={classNames(
              "border-l-[1px] border-l-neu-300 h-full first:pt-4 mx-2 pb-6 px-3 text-left"
            )}
          >
            <Box
              className={classNames(
                "text-neu-900 font-semibold break-words",
                "relative text-base"
              )}
            >
              {
                <LuDot
                  className="text-neu-300 absolute -left-[27px]"
                  size={30}
                />
              }
              <p className="break-before-all">Test #{testId}</p>
            </Box>
            <Box className="text-sm font-normal text-neu-700 flex items-center gap-2 mt-1">
              <img src="/src/assets/avi.png" alt="" className="w-4 h-4" />
              <p>{"McAuthor Kenslov"}</p>
            </Box>
          </Box>
          <Box>
            <button className="flex gap-2 text-sm font-[600] text-pri-650 mt-6">
              <FaDownload /> <span className="">Download</span>
            </button>
          </Box>
        </Box>
      </Box>
    </ModalMain>
  );
};

export { PastTests };
