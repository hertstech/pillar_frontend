import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetHCPInfo = () => {
  return useQuery({
    queryKey: ["hcp"],
    queryFn: () => {
      return axiosInstance.get(`/hcp/profile`);
    },
  });
};
