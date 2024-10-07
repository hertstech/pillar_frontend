import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { LuListChecks } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { selectedLogIdsState } from "../../../../atoms/monitoring/charts";
// import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../Utils/useAlert";

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
  // const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useRecoilState(selectedLogIdsState);
  const [tempSelectedIds, setTempSelectedIds] = useState<number[]>(selectedIds);
  const [selectedActivityType, setSelectedActivityType] =
    useState<string>("Login");

  const filteredLoggingData = data.filter((item) =>
    selectedActivityType === "Login"
      ? item.activity_info === "Login Successful"
      : item.activity_info === "Logout"
  );

  const handleSelect = (id: number) => {
    setTempSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeselectAll = () => {
    setTempSelectedIds([]);
  };

  const handleSaveChanges = () => {
    setSelectedIds(tempSelectedIds);

    if (tempSelectedIds.length < 11) {
      useAlert({
        icon: "success",
        title: "Logs pinned successfully",
        timer: 3000,
      });
      // navigate("/dashboard/home");
    }
  };

  return (
    <ModalMain width={"620px"} open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[500px]">
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

        <FormControl component="fieldset">
          <FormLabel component="legend">Select Activity Type</FormLabel>
          <RadioGroup
            row
            value={selectedActivityType}
            onChange={(e) => setSelectedActivityType(e.target.value)}
          >
            <FormControlLabel value="Login" control={<Radio />} label="Login" />
            <FormControlLabel
              value="Logout"
              control={<Radio />}
              label="Logout"
            />
          </RadioGroup>
        </FormControl>

        <Box className="flex items-center justify-between gap-6 text-sm">
          <p>{tempSelectedIds.length} selected</p>
          {tempSelectedIds.length > 1 && (
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
            {filteredLoggingData.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    color="success"
                    checked={tempSelectedIds.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                  />
                }
                label={
                  <Box className="flex gap-2 truncate overflow-hidden max-w-[530px]">
                    <span className="truncate overflow-hidden max-w-[350px]">
                      {item.activity_info}
                    </span>{" "}
                    by <b>{item.tenet_name}</b>
                  </Box>
                }
              />
            ))}
          </Box>
        </FormGroup>

        <PrimaryButton
          onClick={handleSaveChanges}
          width="45%"
          buttonName="Update settings"
          disabled={tempSelectedIds.length > 10}
        />
      </Box>
    </ModalMain>
  );
};

export default ActivityPinModal;
