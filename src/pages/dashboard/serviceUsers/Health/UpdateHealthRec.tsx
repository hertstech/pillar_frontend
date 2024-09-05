import React, { useEffect, useState } from "react";
import DrawerComp from "../../../../components/Drawer";
import { EditIcon } from "../../../../assets/icons";
import { Box, Button } from "@mui/material";
import { MoveBackComp } from "../../../../components/MoveBack";
import { CustomSelect } from "../../../../components/Select";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { selectItems } from "../../../../data/healthRecord";
import { axiosInstance } from "../../../../Utils";
import Swal from "sweetalert2";
import { recordSchema } from "./schemas/healthRecord";
import ReasoningModal from "./Components/resonsModal";

type FormValues = {
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  notes: string;
};

interface IProps {
  id: string | null;
  refreshData: () => void;
}

export const UpdateHealthRec: React.FC<IProps> = ({ id, refreshData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>({
    resolver: joiResolver(recordSchema),
  });

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const severityValue = useWatch({ control, name: "severity" });
  const treatmentStatusValue = useWatch({ control, name: "treatmentStatus" });
  const treatmentTypeValue = useWatch({ control, name: "treatmentType" });
  const followUpPlanValue = useWatch({ control, name: "followUpPlans" });

  useEffect(() => {
    setValue("severity", selectItems.severity[0].value);
    setValue("treatmentStatus", selectItems.treatmentStatus[0].value);
    setValue("treatmentType", selectItems.treatmentType[0].value);
    setValue("followUpPlans", selectItems.followUpPlans[0].value);
  }, [setValue]);

  useEffect(() => {
    if (treatmentStatusValue === "pending"||
      treatmentStatusValue === "cancelled" ||
      treatmentStatusValue === "on_hold"
    ) {
      setIsReasoningModalOpen(true);
    } else {
      setIsReasoningModalOpen(false);
    }
  }, [treatmentStatusValue]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axiosInstance.get(
          `/serviceuser-record/status/history/${id}`
        );
        console.log("record history:", res.data);
      } catch (err) {
        console.error("Error getting record:", err);
      }
    };

    if (id !== null || undefined) {
      getStatus();
    }
  }, [id]);

  const onSubmit = async (data: FormValues) => {
    // if (isReasoningModalOpen) return;

    setIsSubmitting(true);

    const newData = {
      ...data,
      reason_for_change: "I just wanna do it now",
    };

    try {
      const response = await axiosInstance.put(
        `/update-serviceuser-healthsummaryrecord/diagnosis/status/${id}`,
        newData
      );
      setIsSubmitting(true);
      handleCloseDrawer();
      Swal.fire({
        icon: "success",
        title: "Record Updated",
        text: "The health record has been successfully updated.",
      });
      console.log("this is the success msg:", response);
      refreshData();
    } catch (error: any) {
      setIsSubmitting(false);
      handleCloseDrawer();
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "An error occurred while updating the record.",
      });
      console.error("Error updating record:", error);
    }
  };

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
        buttonText="Edit"
        open={isDrawerOpen}
        onOpen={handleOpenDrawer}
        onClose={() => setIsDrawerOpen(false)}
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
            subTitle="Some sickness here"
            onMovingBack={() => setIsDrawerOpen(false)}
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
            <CustomSelect
              label="Severity"
              name="severity"
              selectItems={selectItems.severity}
              value={severityValue}
              onChange={(value) => setValue("severity", value)}
              register={register("severity")}
              validationError={errors.severity}
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
            <CustomSelect
              label="Treatment Type"
              name="treatmentType"
              selectItems={selectItems.treatmentType}
              value={treatmentTypeValue}
              onChange={(value) => setValue("treatmentType", value)}
              register={register("treatmentType")}
              validationError={errors.treatmentType}
            />
            <CustomSelect
              label="Follow-Up Plan"
              name="followUpPlans"
              selectItems={selectItems.followUpPlans}
              value={followUpPlanValue}
              onChange={(value) => setValue("followUpPlans", value)}
              register={register("followUpPlans")}
              validationError={errors.followUpPlans}
            />
            <label htmlFor="notes" className="-mb-4">
              Add Notes
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              cols={50}
              style={{
                width: "100%",
                padding: "8px",
                outline: "none",
                minHeight: "100px",
                borderRadius: "8px",
                borderColor: errors.notes ? "red" : "#ccc",
              }}
              className="border-[1px]"
            />
            {errors.notes && (
              <p style={{ color: "red" }}>{errors.notes.message}</p>
            )}

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
              Update Record
            </Button>
          </form>
        </Box>
      </DrawerComp>

      <ReasoningModal
        open={isReasoningModalOpen}
        setOpen={setIsReasoningModalOpen}
        treatmentStatusValue={treatmentStatusValue}
        selectedId={id}
      />
    </>
  );
};