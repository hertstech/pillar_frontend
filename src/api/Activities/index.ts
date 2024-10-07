import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../Utils";

export const useGetPinnedLog = () => {
  return useQuery({
    queryKey: ["activityLog"],
    queryFn: () => {
      return axiosInstance.get("/hcp/tenet/pinned/activity/logs");
    },
    refetchInterval: 60000 * 5,
    refetchIntervalInBackground: true,
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
