import { useState } from "react";
import { axiosInstance } from "../../Utils";

export function useChartApi() {
  const [message, setMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handlePin = async (id: string) => {
    const payLoad = { status: true };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );
      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Pinned success");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const handleUnPin = async (id: string) => {
    const payLoad = { status: false };
    try {
      const res = await axiosInstance.post(
        `/hcp/monitoring/chart/status/${id}`,
        payLoad
      );
      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Unpinned success");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const deleteChart = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/hcp/monitoring/chart/${id}`);
      if (res.status === 200) {
        setShowAlert(true);
        setMessage("Item Deleted successfully");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  return {
    showAlert,
    message,
    handlePin,
    handleUnPin,
    deleteChart,
    setShowAlert,
  };
}
