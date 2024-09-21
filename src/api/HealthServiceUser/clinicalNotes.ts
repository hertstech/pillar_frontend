import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

type NotesType = {
  selectedId: string;
  subject: string;
  notes: string;
};

export const useCreateClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotesType) => {
      const { selectedId, subject, notes } = data;
      return axiosInstance.post(
        `/create-serviceuser-healthsummary/clinical-notes/${selectedId}`,
        { subject, notes }
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
