import React, { useEffect, useState } from "react";
import DrawerComp from "../../../../components/Drawer";
import { EditIcon } from "../../../../assets/icons";
import { Box, Button } from "@mui/material";
import { MoveBackComp } from "../../../../components/MoveBack";
import { CustomSelect } from "../../../../components/Select";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { selectItems } from "../../../../data/healthRecord";
import Swal from "sweetalert2";
import { recordSchema } from "./schemas/healthRecord";
import ReasoningModal from "./Components/resonsModal";
import { useRecoilState } from "recoil";
import { drawerState } from "../../../../atoms/drawerState";
import InputField from "../../../../components/InputField";
import { axiosInstance } from "../../../../Utils";
import classNames from "classnames";

type FormValues = {
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  notesValue: string;
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<FormValues>({
    resolver: joiResolver(recordSchema),
  });

  const severityValue = useWatch({ control, name: "severity" });
  const treatmentStatusValue = useWatch({ control, name: "treatmentStatus" });
  const treatmentTypeValue = useWatch({ control, name: "treatmentType" });
  const followUpPlanValue = useWatch({ control, name: "followUpPlans" });
  const notesValue = useWatch({ control, name: "notesValue" });

  useEffect(() => {
    setValue("severity", severity || selectItems.severity[0].value);
    setValue(
      "treatmentStatus",
      treatmentStatus || selectItems.treatmentStatus[0].value
    );

    setValue(
      "treatmentType",
      treatmentType || selectItems.treatmentType[0].value
    );
    setValue(
      "followUpPlans",
      followUpPlans || selectItems.followUpPlans[0].value
    );
    setValue("notesValue", notes || "");
  }, [
    severity,
    treatmentStatus,
    treatmentType,
    followUpPlans,
    notes,
    setValue,
  ]);

  // useEffect(() => {
  //   const getStatusHistory = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `/serviceuser-record/status/history/${id}`
  //       );
  //       console.log("record history:", res.data);
  //     } catch (err) {
  //       console.error("Error getting record:", err);
  //     }
  //   };

  //   if (id !== null || undefined) {
  //     getStatusHistory();
  //   }
  // }, [id]);

  const onSubmit = async (data: FormValues) => {
    setIsDisabled(true);
    setIsSubmitting(true);

    const formValues = data;

    console.log(formValues); // temporal value control

    if (["pending", "cancelled", "on_hold"].includes(data.treatmentStatus)) {
      setIsReasoningModalOpen(true);
      return;
    }

    try {
      await updateRecord(data, "I just wanna do it now");
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(true);
      setIsDisabled(true);
    }
  };

  const handleModalClose = async (reason_for_change: string) => {
    setIsReasoningModalOpen(false);

    const updatedData = { ...getValues(), reason_for_change };

    try {
      await updateRecord(updatedData, reason_for_change);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(true);
    }
  };

  const updateRecord = async (data: FormValues, reason: string) => {
    const response = await axiosInstance.put(
      `/update-serviceuser-healthsummaryrecord/diagnosis/status/${id}`,
      { ...data, reason_for_change: reason }
    );

    console.log(response); // temporal response control

    handleCloseDrawer();
    if (refreshData) refreshData();

    Swal.fire({
      icon: "success",
      title: "Record Updated",
      text: "The health record has been successfully updated.",
    });
  };

  const handleError = (error: any) => {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text:
        error.response?.data?.message ||
        "An error occurred while updating the record.",
    });
  };

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
              onChange={(value) => {
                setIsDisabled(false);
                setValue("treatmentStatus", value);
              }}
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
                  {
                    pending: "#F2F4F7",
                    active: "#E7F6EC",
                    on_hold: "#FEF6E7",
                    completed: "#EFF8FF",
                    cancelled: "#FBEAE9",
                  }[item.value] || "",
                color:
                  {
                    pending: "#475367",
                    active: "#099137",
                    on_hold: "#DD900D",
                    completed: "#1570EF",
                    cancelled: "#CB1A14",
                  }[item.value] || "black",
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
              className={classNames("border-[1px]")}
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
              disabled={isSubmitting || isDisabled}
              variant="outlined"
              className="!capitalize"
            >
              {isSubmitting
                ? "Submitting..."
                : isDisabled
                ? "Update Record"
                : "Update Record"}
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
