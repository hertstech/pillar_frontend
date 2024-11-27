import { Avatar, Box, Typography, Divider } from "@mui/material";
import React from "react";
import { TextLabel } from "../../pages/dashboard/serviceUsers/Health/Components/textLabel";
import GaugeChart from "react-gauge-chart";
import moment from "moment";
import { client } from "../../pages/dashboard/serviceUsers/Overview";

interface IProps {
  client: client;
  isLoading: boolean;
  NHRID: number | any;
}
export const ProfileSummary: React.FC<IProps> = ({
  client,
  NHRID,
  isLoading,
}) => {
  return (
    <Box className="w-[30%]">
      <Box className="w-full h-fit rounded-lg border-[1px] border-[#E4E7EC] bg-white">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Avatar sx={{ bgcolor: "#B2DDFF" }}>
            {client?.firstName.slice(0, 1)}
          </Avatar>
          <div className="">
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                fontWeight: 500,
                fontSize: 18,
                textTransform: "capitalize",
                marginLeft: 2,
              }}
            >
              {client?.firstName + " " + client?.lastName}
            </Typography>
            <span
              style={{
                fontWeight: 400,
                fontSize: 14,
                color: "#475467",
                marginLeft: 16,
              }}
            >
              NHRID: {NHRID}
            </span>
          </div>
        </Box>

        <Divider />

        <Box className="grid grid-cols-2 p-4">
          <>
            <TextLabel
              isLoading={isLoading}
              label="Age"
              text={moment(new Date()).diff(client?.dateOfBirth, "years")}
            />
            <TextLabel
              isLoading={isLoading}
              label="Height"
              text={client?.height + "" + "cm"}
            />{" "}
            <TextLabel isLoading={isLoading} label="Eye color" text={"None"} />
            <TextLabel
              isLoading={isLoading}
              label="HMO Plan"
              text={client?.HMOPlan || "None"}
            />
          </>
          <>
            <TextLabel
              isLoading={isLoading}
              label="Date of Birth"
              text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
            />
            <TextLabel
              isLoading={isLoading}
              label="Weight"
              text={client?.weight + "" + "kg"}
            />
            <TextLabel
              isLoading={isLoading}
              label="Hair color"
              text={"Brown"}
            />
            <TextLabel
              isLoading={isLoading}
              label="Weight"
              text={"123883893/O"}
            />
          </>
        </Box>
      </Box>
      <Box className="w-full h-fit rounded-lg border-[1px] border-[#E4E7EC] mt-8 p-8 bg-white">
        <GaugeChart
          id="gauge-chart5"
          arcsLength={[50, 50, 50, 50]}
          colors={["#40B2F6", "#42B129", "#FFB40B", "#FE3F32"]}
          percent={
            client?.bmi ? parseFloat(client?.bmi.toFixed(1)) / 100 : "N/A"
          }
          needleScale={0.4}
          arcPadding={-0.1}
          arcWidth={0.4}
          cornerRadius={0}
          textColor={["#40B2F6", "#42B129", "#FFB40B", "#FE3F32"]}
          // formatTextValue={}
          textComponent={
            <div>
              <div className="flex w-full justify-between">
                <p className="text-xs font-base text-neu-700">
                  Body Mass Index
                </p>
                <p>{"icon"}</p>
              </div>
              <p className="text-2xl text-neu-900 font-semibold">
                {client?.bmi ? client?.bmi.toFixed(1) : "N/A"}{" "}
                <span className="text-sm">kg/m&sup2;</span>
              </p>
            </div>
          }
        />
      </Box>
      <Box className="w-full h-fit rounded-lg border-[1px] border-[#E4E7EC] mt-8 p-8 bg-white">
        <Box>
          <TextLabel
            isLoading={isLoading}
            label="Email Address"
            text={client?.email || "None"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Phone Number"
            text={client?.phoneNumber}
          ></TextLabel>
          <TextLabel
            isLoading={isLoading}
            label="Address"
            text={client?.address}
          />
        </Box>
        <Box className="grid grid-cols-3">
          {" "}
          <TextLabel
            isLoading={isLoading}
            label="L.G.A"
            text={client?.lga || "N/A"}
          />
          <TextLabel
            isLoading={isLoading}
            label="State"
            text={client?.state || "N/A"}
          ></TextLabel>
          <TextLabel
            isLoading={isLoading}
            label="Country"
            text={"Nigeria"} // to be updated from server
          />
        </Box>
        <p className="text-right font-light text-sm text-neu-600 italic">
          Last updated on 23rd Nov, 2024
        </p>
      </Box>
    </Box>
  );
};
