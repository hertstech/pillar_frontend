import { Box, Button, Popover, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { getStatusColor } from "../../../../../Utils/getStatusColor";
import AddClinicalNotes from "./addClinicalNotes";
import { notesData } from "../../../../../data/healthRecord";

interface IProps {
  item: {
    id: string;
    type: string;
    primaryDiagnosis?: string;
    secondaryDiagnosis?: string;
    genotype?: string;
    bloodGroup?: string;
    treatmentStatus?: string;
  };
}

export const ClinicalNoteComp = ({ item }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  const getDiagnosisText = () => {
    switch (item?.type) {
      case "primary diagnosis":
        return item?.primaryDiagnosis;
      case "secondary diagnosis":
        return item?.secondaryDiagnosis;
      case "genotype":
        return item?.genotype;
      case "blood group":
        return item?.bloodGroup;
      default:
        return null;
    }
  };

  const renderPersonInfo = (title: string, name: string, date: string) => (
    <Box className="col-span-1 flex flex-col font-[400] gap-[2px] leading-5 text-neu-500">
      <h4 className="text-[.75rem]">{title}</h4>
      <Box className="flex gap-1 items-center">
        <img
          src={"/src/assets/docAvater.png"}
          alt="author photograph"
          className="w-8 h-8"
        />
        <Box>
          <p className="text-neu-900 text-[.85rem]">{name}</p>
          <p className="text-[.75rem] leading-4 -mt-1">{date}</p>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="w-full">
      <Box className="flex items-center justify-between h-14">
        <Box className="flex items-center gap-2 h-8">
          <Typography className="!text-[.85rem] !font-[500] !leading-5">
            Sort by
          </Typography>
          <Button
            className="!capitalize !text-[.725rem] !text-neu-500 h-fit border-[4px]"
            onClick={handleClick}
          >
            All Notes <FaAngleDown className="mx-2 font-[400]" />
          </Button>
          <Popover
            id={popoverId}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box
              sx={{
                zIndex: 1,
                background: "white",
                border: "1px #F2F4F7 solid",
                borderRadius: 2,
                width: "80px",
                p: 1,
              }}
            >
              now
            </Box>
          </Popover>
        </Box>

        <button
          className="border-none bg-transparent capitalize text-pri-600 text-[1rem] leading-6 font-semibold outline-none"
          onClick={handleModalOpen}
        >
          Add Notes
        </button>
      </Box>

      {notesData.map((note, index) => (
        <Box
          key={index}
          className="min-h-[208px] max-w-[582px] p-4 bg-bg rounded-lg mt-4"
        >
          <Box className="flex items-center justify-between">
            <Box className="flex items-center text-[.825rem] capitalize">
              <p className="font-[600] leading-4 text-gray-800">
                {getDiagnosisText()}
              </p>
              {item?.treatmentStatus && <LuDot />}
              <p className={getStatusColor(item)}>
                {item?.treatmentStatus === "on_hold"
                  ? "On Hold"
                  : item.treatmentStatus}
              </p>
            </Box>
            <IoEllipsisHorizontalCircleOutline className="text-neu-500 cursor-pointer"/>
          </Box>
          <p className="text-[.825rem] font-[400] leading-5 !my-4 text-neu-500 min-h-[65px]">
            {note.noteText}
          </p>
          <Box className="grid grid-cols-2 mt-4">
            {renderPersonInfo("Created By", note.createdBy, note.createdDate)}
            {renderPersonInfo(
              "Approved By",
              note.approvedBy,
              note.approvedDate
            )}
          </Box>
        </Box>
      ))}

      <AddClinicalNotes
        open={modalOpen}
        setOpen={setModalOpen}
        onClose={handleModalClose}
        selectedId={item.id}
      />
    </Box>
  );
};