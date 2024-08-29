import { useState, useEffect } from "react";
import { axiosInstance } from "../Utils";

export const useRecordStatus = (NHRID: string) => {
  const [status, setStatus] = useState({ genotype: false, bloodGroup: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get(
          `/serviceuser-record-status/${NHRID}`
        );

        setStatus({
          genotype:
            res.data.genetic_Information.genotype === true ? true : false,
          bloodGroup:
            res.data.genetic_Information.bloodgroup === true ? true : false,
        });
        setData(res.data);
      } catch (err: any) {
        console.error("Error fetching record status:", err);
        setError(err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [NHRID]);

  return { status, loading, error, data };
};
