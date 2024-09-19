import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

type NotesType = {
  selectedId: string;
  subject: string;
  notes: string;
};

export const useCreateClinicalNote = () => {
  return useMutation({
    mutationFn: (data: NotesType) => {
      const { selectedId, subject, notes } = data;
      return axiosInstance.post(
        `/create-serviceuser-healthsummary/clinical-notes/${selectedId}`,
        { subject, notes }
      );
    },
  });
};
