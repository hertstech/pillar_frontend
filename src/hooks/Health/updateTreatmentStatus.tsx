import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { axiosInstance } from "../../Utils";
import { drawerState } from "../../atoms/drawerState";
import { selectItems } from "../../data/healthRecord";
import { recordSchema } from "../../pages/dashboard/serviceUsers/Health/schemas/healthRecord";

type FormValues = {
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  notesValue: string;
};

export const useHealthRecord = (
  id: string | undefined,
  severity: string | undefined,
  treatmentStatus: string | undefined,
  treatmentType: string | undefined,
  followUpPlans: string | undefined,
  notes: string | undefined,
  refreshData?: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReasoningModalOpen, setIsReasoningModalOpen] = useState(false);

  const [_, setDrawerOpen] = useRecoilState(drawerState);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
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

  const updateRecord = async (data: FormValues, reason: string) => {
    try {
      const response = await axiosInstance.put(
        `/update-serviceuser-healthsummaryrecord/diagnosis/status/${id}`,
        {
          ...data,
          reason_for_change: reason,
        }
      );
      console.log("success response;", response);
      if (refreshData) refreshData();
      Swal.fire({
        icon: "success",
        title: "Record Updated",
        text: "The health record has been successfully updated.",
      });
      setDrawerOpen(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          "An error occurred while updating the record.",
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (["pending", "cancelled", "on_hold"].includes(data.treatmentStatus)) {
        setIsReasoningModalOpen(true);
      } else {
        await updateRecord(data, "I just wanna do it now");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "An error occurred while updating the record.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = async (reason_for_change: string) => {
    setIsReasoningModalOpen(false);
    setIsSubmitting(true);
    try {
      const updatedData = { ...getValues(), reason_for_change };
      await updateRecord(updatedData, reason_for_change);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "An error occurred while updating the record.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    handleModalClose,
    isSubmitting,
    isReasoningModalOpen,
    setIsReasoningModalOpen,
    severityValue,
    treatmentStatusValue,
    treatmentTypeValue,
    followUpPlanValue,
    notesValue,
    register,
    setValue,
    errors,
  };
};
