import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ModalMain } from "../../../../components/Modals";
import { PrimaryButton } from "../../../../components/Button/primaryButton";
import { useRecoilState } from "recoil";
import { selectedLogTypeState } from "../../../../atoms/monitoring/charts";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../Utils/useAlert";

interface ActivityPinModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any[];
}

const ActivityPinModal: React.FC<ActivityPinModalProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] =
    useRecoilState<string[]>(selectedLogTypeState);
  const [tempSelectedTypes, setTempSelectedTypes] =
    useState<string[]>(selectedTypes);

  const handleSelect = (activityType: string) => {
    setTempSelectedTypes((prev) =>
      prev.includes(activityType)
        ? prev.filter((item) => item !== activityType)
        : [...prev, activityType]
    );
  };

  const handleSaveChanges = () => {
    setSelectedTypes(tempSelectedTypes);

    if (tempSelectedTypes.length < 3) {
      useAlert({
        icon: "success",
        title: "Log types pinned successfully",
        timer: 3000,
      });
      navigate("/dashboard/home");
    }
  };

  return (
    <ModalMain width={"620px"} open={open} handleClose={() => setOpen(false)}>
      <Box className="flex flex-col justify-between h-[350px]">
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
          <FormLabel component="legend">Select Activity Types </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={tempSelectedTypes.includes("Login Successful")}
                  onChange={() => handleSelect("Login Successful")}
                />
              }
              label="Login Successful"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={tempSelectedTypes.includes("Login Unsuccessful")}
                  onChange={() => handleSelect("Login Unsuccessful")}
                />
              }
              label="Login Unsuccessful"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={tempSelectedTypes.includes("Logout")}
                  onChange={() => handleSelect("Logout")}
                />
              }
              label="Logout"
            />
          </FormGroup>
        </FormControl>

        {/* Save Button */}
        <PrimaryButton
          onClick={handleSaveChanges}
          width="45%"
          buttonName="Update settings"
          disabled={tempSelectedTypes.length === 0}
        />
      </Box>
    </ModalMain>
  );
};

export default ActivityPinModal;
