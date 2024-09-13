import React, { useState } from "react";
import { Box,  Typography } from "@mui/material";
import { MoveBackComp } from "../../../../components/MoveBack";
import { TextLabel } from "./Components/textLabel";
import moment from "moment";

interface IProps {
  data: any;
  id: string | undefined;
  disableDrawer: boolean;
  refreshData?: () => void;

}

export const HealthRecordOverview: React.FC<IProps> = ({
  
  data: item
}) => {
  const [_, setIsDrawerOpen] = useState(false);

  console.log("health record here;", item);

  // useEffect(() => {
  //   const getStatusHistory = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `/serviceuser-record/status/history/${id}`
  //       );
  //       console.log("record history:", res.data);
  //     } catch (err) {
  //       console.error("Error getting record:", err);
  //     }
  //   };

  //   if (id !== null || undefined) {
  //     getStatusHistory();
  //   }
  // }, [id]);

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Box
        sx={{
          width: "630px",
          paddingX: "24px",
          paddingTop: "75px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <MoveBackComp
          title={item?.primaryDiagnosis || "Sickness clicked here"}
          subTitle="Health Information"
          onMovingBack={handleCloseDrawer}
        />

        {/* {show === `${item?.type}${index}` && ( */}
        <div style={{ padding: 6 }} className="mt-32">
          <Box
            sx={{
              display: "grid",
              columnGap: 1.5,
              rowGap: 1.5,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
              },
            }}
          >
            <TextLabel
              label="Date Created"
              text={moment(item.date_created).format("DD/MM/YYYY") || "None"}
            />
            <TextLabel label="Type" text={item.categories || "None"} />

            {/* VITALS DATA VIEW*/}
            {item.type === "blood pressure" && (
              <TextLabel label="Systolic Reading" text={item.systolic} />
            )}

            {item.type === "blood pressure" && (
              <TextLabel label="Diastolic Reading" text={item.diasttolic} />
            )}

            {item.type === "body temperature" && (
              <TextLabel
                label="Reading"
                text={`${item.reading} ${item.degreeRating}` || "N/A"}
              />
            )}

            {item.type === "pulse rate" && (
              <TextLabel label="Beat Per Minute" text={item.bpm} />
            )}

            {item.type === "glucose level" && (
              <TextLabel label="Glucose level" text={item.mgDl} />
            )}

            {/* GENETIC INFORMATION */}
            {item.type === "blood group" && (
              <TextLabel label="Blood Group" text={item.bloodGroup} />
            )}

            {item.type === "genotype" && (
              <TextLabel label="Genotype" text={item.genotype || "N/A"} />
            )}

            {/* IMMUNIZATION DATA */}
            {item.categories === "immunization" && (
              <TextLabel
                label="Manufacturer"
                text={item.manufacturer || "N/A"}
              />
            )}

            {item.categories === "immunization" && (
              <TextLabel
                label="Batch Number"
                text={item.batchNumber || "N/A"}
              />
            )}

            {item.categories === "immunization" && (
              <TextLabel
                label="Administration Date"
                text={moment(item.administrationDate).format("DD/MM/YYYY")}
              />
            )}

            {item.categories === "immunization" && (
              <TextLabel
                label="Expiration Date"
                text={moment(item.expirationDate).format("DD/MM/YYYY")}
              />
            )}

            {/* DIAGNOSIS DATA VIEW*/}
            {item.type === "primary diagnosis" && (
              <TextLabel
                label="Primary Diagnosis"
                text={item.primaryDiagnosis || "N/A"}
              />
            )}

            {item.type === "secondary diagnosis" && (
              <TextLabel
                label="Secondary Diagnosis"
                text={item.secondaryDiagnosis || "N/A"}
              />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel label="Severity" text={item.severity || "N/A"} />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel
                label="Treatment Status"
                text={item.treatmentStatus || "N/A"}
              />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel
                label="Treatment type"
                text={item.treatmentType || "N/A"}
              />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel
                label="Follow up Plans"
                text={item.followUpPlans || "N/A"}
              />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel
                label="Prescribed by"
                text={`${item.title} ${item.reading}` || "N/A"}
              />
            )}

            {item.categories === "diagnosis" && (
              <TextLabel label="Clinical notes" text={item.progressNote} />
            )}
          </Box>

          <TextLabel label="Additional Notes" text={item.notes || "None"} />

          <div
            style={{
              padding: "16px 0px",
              color: "#101928",
            }}
          >
            <Typography fontWeight={400} fontSize={12}>
              Administered by
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              🕒 ID: #{item.pillar_user_id_fk}
            </Typography>
          </div>
        </div>
        {/* )} */}
      </Box>
    </>
  );
};
