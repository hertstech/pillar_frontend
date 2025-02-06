import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";
import { ConsentData } from "../../types/serviceUserTypes/consent";

type CType = {
  NHRID: number;
  data: ConsentData;
};

export const useUpdateUserConsent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ NHRID, data }: CType) => {
      return axiosInstance.patch(`/update-serviceiuser-profile/${NHRID}`, data);
      data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userConsent"],
      });
    },
  });
};

export const useGetUserConsent = (NHRID: number) => {
  return useQuery({
    queryKey: ["userConsent", NHRID],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/consents/${NHRID}`);
      return response;
    },
  });
};
