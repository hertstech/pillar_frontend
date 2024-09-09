import React from "react";
import DrawerComp from "../../../../components/Drawer";
import { EditIcon } from "../../../../assets/icons";
import { Box, Button } from "@mui/material";
import { MoveBackComp } from "../../../../components/MoveBack";
import { CustomSelect } from "../../../../components/Select";
import { useRecoilState } from "recoil";
import { drawerState } from "../../../../atoms/drawerState";
import InputField from "../../../../components/InputField";
import ReasoningModal from "./Components/resonsModal";
import { selectItems } from "../../../../data/healthRecord";
import { useHealthRecord } from "../../../../hooks/Health/updateTreatmentStatus";

interface IProps {
  id: string | undefined;
  notes: string | undefined;
  sickness: string | undefined;
  severity: string | undefined;
  treatmentType: string | undefined;
  followUpPlans: string | undefined;
  treatmentStatus: string | undefined;
  getData: (e: React.MouseEvent) => void;
  refreshData?: () => void;
}

export const UpdateHealthRec: React.FC<IProps> = ({
  id,
  refreshData,
  severity,
  treatmentStatus,
  treatmentType,
  followUpPlans,
  notes,
  getData,
  ...rest
}) => {
  const [_, setIsDrawerOpen] = useRecoilState(drawerState);
  const {
    handleSubmit,
    onSubmit,
    isSubmitting,
    severityValue,
    handleModalClose,
    isReasoningModalOpen,
    setIsReasoningModalOpen,
    treatmentStatusValue,
    treatmentTypeValue,
    followUpPlanValue,
    notesValue,
    setValue,
    register,
    errors,
  } = useHealthRecord(
    id,
    severity,
    treatmentStatus,
    treatmentType,
    followUpPlans,
    notes,
    refreshData
  );

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <DrawerComp
        sx={{
          gap: "4px",
          width: "106px",
          color: "#099250",
          outline: "none",
          fontWeight: 600,
          border: "1px solid",
          borderRadius: "16px",
          borderColor: "#E7E9FB",
          backgroundColor: "transparent",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#099250",
            color: "white",
          },
        }}
        isIcon={<EditIcon />}
        buttonText="Update"
        onOpen={getData}
      >
        <Box
          sx={{
            width: "525px",
            paddingX: "24px",
            paddingTop: "75px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <MoveBackComp
            title="Update health information"
            subTitle={rest.sickness || "loading..."}
            onMovingBack={handleCloseDrawer}
          />

          <form
            style={{
              marginTop: "32px",
              flexDirection: "column",
              display: "flex",
              gap: "24px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              type="text"
              label="Severity"
              name="severity"
              value={severityValue}
              disabled
            />

            <CustomSelect
              label="Treatment Status"
              name="treatmentStatus"
              selectItems={selectItems.treatmentStatus}
              value={treatmentStatusValue}
              onChange={(value) => setValue("treatmentStatus", value)}
              register={register("treatmentStatus")}
              validationError={errors.treatmentStatus}
              itemStyle={(item) => ({
                padding: "4px 16px",
                whiteSpace: "nowrap",
                width: "fit-content",
                borderRadius: "600px",
                fontWeight: item.value === "" ? 400 : 600,
                fontSize: item.value === "" ? "16px" : "12px",
                backgroundColor:
                  item.value === "pending"
                    ? "#F2F4F7"
                    : item.value === "active"
                    ? "#E7F6EC"
                    : item.value === "on_hold"
                    ? "#FEF6E7"
                    : item.value === "completed"
                    ? "#EFF8FF"
                    : item.value === "cancelled"
                    ? "#FBEAE9"
                    : "",
                color:
                  item.value === "pending"
                    ? "#475367"
                    : item.value === "active"
                    ? "#099137"
                    : item.value === "on_hold"
                    ? "#DD900D"
                    : item.value === "completed"
                    ? "#1570EF"
                    : item.value === "cancelled"
                    ? "#CB1A14"
                    : "black",
              })}
            />

            <InputField
              type="text"
              label="Treatment Type"
              name="treatmentType"
              value={treatmentTypeValue}
              disabled
            />

            <InputField
              type="text"
              label="Follow-Up Plan"
              name="followUpPlans"
              value={followUpPlanValue}
              disabled
            />

            <label htmlFor="notes" className="-mb-4">
              Add Notes
            </label>
            <textarea
              value={notesValue}
              disabled
              {...register("notesValue")}
              rows={4}
              cols={50}
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                minHeight: "100px",
                borderRadius: "8px",
                borderColor: errors.notesValue ? "red" : "#e5e5e5",
                color: "#a3a3a3",
                backgroundColor: "#F0F2F5",
                borderWidth: "1px",
                borderStyle: "solid",
                cursor: "not-allowed",
              }}
              className="border-[1px]"
            />

            <Button
              type="submit"
              sx={{
                color: "#F6FEF9",
                outline: "none",
                fontSize: "1rem",
                fontWeight: 600,
                background: "#2E90FA",
                "&:hover": { backgroundColor: "#2E90FA" },
                padding: "16px 24px",
                borderRadius: 2,
                height: "3.5rem",
                width: "16rem",
                "&.Mui-disabled": {
                  opacity: 0.3,
                  color: "white",
                },
              }}
              disabled={isSubmitting}
              variant="outlined"
              className="!capitalize"
            >
              {isSubmitting ? "Submitting..." : "Update Record"}
            </Button>
          </form>
        </Box>
      </DrawerComp>

      <ReasoningModal
        sickness={rest.sickness}
        open={isReasoningModalOpen}
        setOpen={setIsReasoningModalOpen}
        onClose={handleModalClose}
        treatmentStatusValue={treatmentStatusValue}
        selectedId={id}
      />
    </>
  );
};
