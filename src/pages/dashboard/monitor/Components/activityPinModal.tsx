import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { LuListChecks } from "react-icons/lu";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any[];
}

const ActivityPinModal: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <ModalMain width={"620px"} open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[436px]">
        <Box>
          <Box className="flex justify-between items-center">
            <h1 className="text-[1.25rem] font-[600] leading-6">
              Pin Activity Logs
            </h1>
            <p
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-center cursor-pointer rounded-full bg-pri-50 text-pri-500"
            >
              x
            </p>
          </Box>
          <h2 className="text-base font-[400] text-neu-600 leading-5 mt-2 py-1">
            Pin activity log types to the dashboard
          </h2>
        </Box>

        <Box className="flex items-center justify-between gap-6 text-sm">
          <p>{selectedIds.length} selected</p>
          {selectedIds.length > 1 && (
            <p
              onClick={handleDeselectAll}
              className="text-pri-600 flex items-center gap-1 font-semibold cursor-pointer"
            >
              Deselect All <LuListChecks />
            </p>
          )}
        </Box>
        <FormGroup>
          <Box className="flex flex-col overflow-y-auto h-[200px] scrollbar-hide">
            {data.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    color="success"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                }
                label={
                  <Box className="flex gap-2 truncate overflow-hidden max-w-[530px]">
                    <span className="truncate overflow-hidden max-w-[350px]">
                      {item.activity_info}
                    </span>{" "}
                    by{" "}
                    <b>
                      {item.tenet_name}
                    </b>
                  </Box>
                }
              />
            ))}
          </Box>
        </FormGroup>

        <PrimaryButton
          type="submit"
          width="45%"
          buttonName="Update settings"
          disabled={selectedIds.length === 0}
        />
      </Box>
    </ModalMain>
  );
};

export default ActivityPinModal;
