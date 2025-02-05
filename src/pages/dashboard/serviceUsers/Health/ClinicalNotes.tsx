import { useState, MouseEvent, useEffect } from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { getStatusColor } from "../../../../Utils/getStatusColor";
import AddClinicalNotes from "./AddClinicalNote";
import classNames from "classnames";
import { useFormatDate } from "../../../../Utils/dateToText";
import { DeleteClinicalNote } from "./DeleteClinicalNote";
import { FemaleAvatar } from "../../../../../public/assets/Icons";
import UpdateClinicalNotes from "./UpdateClinicalNote";
import { NotesType } from "../../../../types/serviceUserTypes/clinicalNotes";
import {
  useApproveClinicalNote,
  useGetClinicalNote,
} from "../../../../api/HealthServiceUser/clinicalNotes";
import { useAlert } from "../../../../Utils/useAlert";
import { PropagateLoader } from "react-spinners";

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
  const [anchorEls, setAnchorEls] = useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedNote, setSelectedNote] = useState();
  const [disabled, setDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const { data, isLoading } = useGetClinicalNote(item.id);
  const { mutate } = useApproveClinicalNote();

  const handleEllipsisClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEls((prev) => ({
      [index]: prev[index] ? null : event.currentTarget,
    }));
  };

  const handlePopoverClose = (index: number) => {
    setAnchorEls((prev) => ({ ...prev, [index]: null }));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setAnchorEls({});
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setModalOpen(false);
  };

  const handleEditNote = (note: any) => {
    setSelectedId(note.id);
    setSelectedNote(note);
    setUpdateModalOpen(true);
    setAnchorEls({});
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleOpenDelete = (noteId: string) => {
    setSelectedId(noteId);
    setShowDelete(true);
    setAnchorEls({});
  };

  const openPopover = (index: number) => Boolean(anchorEls[index]);
  const open = Boolean(anchorEls);
  const popoverId = open ? "simple-popover" : undefined;

  const clinicalNotes =
    data?.data.map((el: NotesType) => ({
      id: el.id,
      subject: el.subject,
      createdBy: el.author,
      createdDate: el.date_created,
      approvedBy: el.approved_by_name,
      approvedDate: el.date_created,
      notes: el.notes,
      approved: el.approved,
    })) || [];

  const handleApproval = (
    noteId: string,
    noteState: boolean,
    index: number = 100
  ) => {
    const newApproval = !noteState;

    mutate(
      { selectedId: noteId, approved: newApproval },
      {
        onSuccess: () => {
          useAlert({
            isToast: true,
            icon: "success",
            position: "top-start",
            title: `Notes ${
              newApproval ? "Approved" : "Disapproved"
            } successfully`,
          });
          setAnchorEls({});
          handlePopoverClose(index);
        },
        onError: () => {
          useAlert({
            isToast: true,
            icon: "error",
            position: "top-start",
            title: `Notes ${
              newApproval ? "Approval" : "Disapproval"
            } unsuccessful`,
          });
          setAnchorEls({});

          handlePopoverClose(index);
        },
      }
    );
  };

  useEffect(() => {
    if (item.treatmentStatus === "completed") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [item]);

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
        <FemaleAvatar />
        <Box>
          <p className="text-neu-900 text-[.85rem] capitalize">{name}</p>
          <p className="text-[.75rem] leading-4 -mt-1">
            {useFormatDate({ date })}
          </p>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="w-full">
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-2 h-8">
          <Typography className="!text-[.85rem] !font-[500] !leading-5">
            Sort by
          </Typography>
          <Button
            className="!capitalize !text-[.725rem] !text-neu-500 h-fit border-[4px]"
            onClick={(e: any) => handleEllipsisClick(e, 100)}
          >
            All Notes <FaAngleDown className="mx-2 font-[400]" />
          </Button>
          <Popover
            id={popoverId}
            open={openPopover(100)}
            anchorEl={anchorEls[100]}
            onClose={() => handlePopoverClose(100)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Box p={2} className="flex flex-col gap-2 text-xs">
              now
            </Box>
          </Popover>
        </Box>

        <button
          className={classNames(
            `border-none bg-transparent capitalize text-pri-600
           text-[1rem] leading-6 font-semibold outline-none`,
            disabled && "!text-neu-300 cursor-not-allowed"
          )}
          onClick={handleModalOpen}
          disabled={disabled}
        >
          Add Notes
        </button>
      </Box>

      <Box
        className="max-h-[670px] overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {clinicalNotes.length > 0 ? (
          clinicalNotes.map((note: any, index: number) => (
            <Box
              key={note.id}
              className="max-h-[208px] h-auto max-w-[582px] p-4 bg-bg rounded-lg mt-4"
            >
              <Box className="flex items-center justify-between relative">
                <Box className="flex items-center text-[.825rem] capitalize">
                  <p className="font-[600] leading-4 text-gray-800">
                    {note?.subject || getDiagnosisText()}
                  </p>
                  {item?.treatmentStatus && <LuDot />}
                  <p
                    className={classNames(
                      getStatusColor(note.approved ? "approved" : "on_hold")
                    )}
                  >
                    {note?.approved ? "Approved" : "Pending Approval"}
                  </p>
                </Box>
                <IoEllipsisHorizontalCircleOutline
                  className="text-neu-500 cursor-pointer"
                  onClick={(e: any) => handleEllipsisClick(e, index)}
                />
                <Popover
                  id={`popover-${index}`}
                  open={openPopover(index)}
                  anchorEl={anchorEls[index]}
                  onClose={() => handlePopoverClose(index)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Box
                    p={2}
                    className="flex flex-col gap-3 text-xs !font-medium"
                  >
                    <button
                      onClick={() => handleApproval(note.id, note.approved)}
                      className="capitalize outline-none w-full text-left"
                    >
                      {note.approved ? "Disapprove note" : "mark as approved"}
                    </button>
                    <button
                      onClick={() => handleEditNote(note)}
                      className="capitalize outline-none w-full text-left"
                    >
                      edit note
                    </button>
                    <button
                      onClick={() => handleOpenDelete(note.id)}
                      className="capitalize outline-none w-full text-left !text-err"
                    >
                      delete note
                    </button>
                  </Box>
                </Popover>
              </Box>
              <p className="text-[.825rem] font-[400] leading-5 !my-4 text-neu-500 min-h-[65px]">
                {note?.notes}
              </p>
              <Box className="grid grid-cols-2 mt-4">
                {renderPersonInfo(
                  "Created by",
                  note.createdBy,
                  note.createdDate
                )}
                {note.approved &&
                  renderPersonInfo(
                    "Approved by",
                    note.approvedBy,
                    note.approvedDate
                  )}
              </Box>
            </Box>
          ))
        ) : isLoading ? (
          <p className="flex justify-center items-center h-[10vh]">
            <PropagateLoader size={10} />
          </p>
        ) : (
          <p className="flex justify-center items-center h-full">
            No clinical notes created.
          </p>
        )}
      </Box>

      <DeleteClinicalNote
        id={selectedId as string}
        showModal={showDelete}
        closeModal={handleCloseDelete}
      />

      <AddClinicalNotes
        open={modalOpen}
        setOpen={setModalOpen}
        onClose={handleModalClose}
        selectedId={item.id}
      />
      <UpdateClinicalNotes
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        onClose={handleModalClose}
        selectedId={selectedId as string}
        clinicalNoteData={selectedNote}
      />
    </Box>
  );
};
