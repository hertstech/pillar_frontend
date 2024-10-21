import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

type NotesType = {
  selectedId: string;
  subject: string;
  notes: string;
};

type ApprovalType = {
  selectedId: string;
  approved: boolean;
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

export const useUpdateClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      const { selectedId, subject, notes } = data;
      return axiosInstance.patch(
        `/update-serviceuser-healthsummaryrecord/diagnosis/clinical_notes/${selectedId}`,
        {
          notes,
          subject,
        }
      );
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

export const useApproveClinicalNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ApprovalType) => {
      const { selectedId, approved } = data;
      return axiosInstance.put(
        `/approve-serviceuser-healthsummaryrecord/diagnosis/clinical_notes/${selectedId}`,
        {
          approved,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinicalNotes"] });
    },
  });
};
