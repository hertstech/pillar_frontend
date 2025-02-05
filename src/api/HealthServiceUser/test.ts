import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetAllTest = (NHRID: string) => {
  return useQuery({
    queryKey: ["getTests", NHRID],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/orders/service-user/${NHRID}`);
      return res;
    },
  });
};

export const useGetSingleTest = (testID: string) => {
  return useQuery({
    queryKey: ["getTests", testID],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/order/${testID}`);
      return res;
    },
  });
};
export const useGetTestActivityLog = (orderId: string) => {
  return useQuery({
    queryKey: ["getTestsLogs", orderId],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/order/${orderId}/activity/log`);
      return res;
    },
  });
};

export const useDownloadFiles = (data: Record<string, any>) => {
  const { NHRID, docId } = data;
  return useQuery({
    queryKey: ["getTests", docId],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/order/${NHRID}/report/${docId}`);
      return res;
    },
  });
};

export const useCreateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) => {
      const { NHRID, testData } = data;
      return axiosInstance.post(`/api/v1/order/${NHRID}/test`, testData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTests"],
      });
    },
  });
};

export const useUploadTestDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { NHRID: string; file: File }) => {
      const { NHRID, file } = data;
      const formData = new FormData();
      formData.append("file", file);

      return axiosInstance.post(
        `/api/v1/order/${NHRID}/report`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTests"],
      });
    },
  });
};

export const useUpdateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) => {
      const { NHRID, testData } = data;
      return axiosInstance.put(`/api/v1/order/${NHRID}`, testData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTests"],
      });
    },
  });
};

export const useUpdateTestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) => {
      const { ID, testData } = data;
      return axiosInstance.put(`/api/v1/order/status/${ID}`, testData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTests"],
      });
    },
  });
};

export const useDeleteAllTestOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (testId: string) => {
      return axiosInstance.delete(`/api/v1/order/${testId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTests"],
      });
    },
  });
};
