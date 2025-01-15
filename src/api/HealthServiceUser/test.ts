import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetAllTest = (NHRID: string) => {
  return useQuery({
    queryKey: ["getTests", NHRID],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/order/service-user/${NHRID}`);
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
