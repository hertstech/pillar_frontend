import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";
import { ConsentData } from "../../types/serviceUserTypes/consent";

export const useUpdateUserConsent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ConsentData) => {
      return axiosInstance.put(
        `/update-serviceiuser-profile/368321916817`,
        data
      );
      data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userConsent"],
      });
    },
  });
};

export const useGetUserConsent = (NHRID: string) => {
  return useQuery({
    queryKey: ["userConsent", NHRID],
    queryFn: () => {
      return axiosInstance.get(`/api/v1/consents/${NHRID}`);
    },
  });
};
