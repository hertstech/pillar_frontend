import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetClinicUID = (CUID: string) => {
  return useQuery({
    queryKey: ["getFacility", CUID],
    queryFn: async () => {
      const res = axiosInstance.get(`/api/v1/facilities/${CUID}`);
      return res;
    },
  });
};

export const useTransferRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post(`/api/v1/facilities/transfer`, data);
      data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getFacility"],
      });
    },
  });
};
