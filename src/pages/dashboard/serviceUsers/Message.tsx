import React from "react";
import { Box, Card, Typography } from "@mui/material";
import moment from "moment";
import { axiosInstance } from "../../../Utils";
import NoResultIllustration, { SpinLoader } from "../../../components/NoResult";
import { useParams } from "react-router-dom";

interface apiResponse {
  date_created: string;
  facilityName: string;
  id: string;
  message: string;
  pillartenet_id: string;
  recieved: boolean;
  recipentName: string;
  senderName: string;
  serviceuser_id: string;
}

export default function Message() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  const [record, setRecord] = React.useState<apiResponse[]>([]);

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/get-serviceuser-messages/${id}`);
    
      setRecord(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          {record.length > 0 ? (
            record.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 2,
                  // width: "60%",
                  margin: "16px auto",
                }}
              >
                <Typography>{item.message}</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    textTransform: "capitalize",
                  }}
                >
                  {item.senderName}
                  <span>
                    🕓
                    {moment(item.date_created).format("DD/MM/YYYY")}{" "}
                    {moment(item.date_created).format("LT")}
                  </span>
                </Typography>
              </Card>
            ))
          ) : (
            <NoResultIllustration
              text={"No message conversation with this user."}
            />
          )}
        </>
      )}
    </Box>
  );
}
