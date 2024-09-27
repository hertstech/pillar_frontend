import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

type NotesType = {
  selectedId: string;
  subject: string;
  notes: string;
};

const clinicalNotesBaseUrl = "/create-serviceuser-healthsummary/clinical-notes";

export const useCreateClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotesType) => {
      const { selectedId, subject, notes } = data;
      return axiosInstance.post(`${clinicalNotesBaseUrl}/${selectedId}`, {
        subject,
        notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinicalNotes"],
      });
    },
  });
};

export const useUpdateClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      const { selectedId, subject, note } = data;
      return axiosInstance.put(`${clinicalNotesBaseUrl}/${selectedId}`, {
        subject,
        note,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinicalNotes"] });
    },
  });
};

export const useDeleteClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (selectedId: string) => {
      return axiosInstance.delete(
        `delete-serviceuser-healthsummaryrecord/diagnosis/clinical_notes/${selectedId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinicalNotes"],
      });
    },
  });
};

export const useGetClinicalNote = (selectedId: string) => {
  return useQuery({
    queryKey: ["clinicalNotes", selectedId],
    queryFn: () => {
      return axiosInstance.get(
        `/serviceuser-record/clinical-notes/${selectedId}`
      );
    },
  });
};

export const useGetHealthHistoryLog = (selectedId: string) => {
  return useQuery({
    queryKey: ["activityLog", selectedId],
    queryFn: () => {
      return axiosInstance.get(`/serviceuser-record/history/${selectedId}`);
    },
  });
};
