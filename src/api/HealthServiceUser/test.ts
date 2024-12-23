import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetDraftedTest = (CUID: string) => {
  return useQuery({
    queryKey: ["getTests", CUID],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/test/${CUID}`);
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
