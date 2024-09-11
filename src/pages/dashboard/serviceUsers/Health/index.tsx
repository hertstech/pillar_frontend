import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import classNames from "classnames";
import { LuDot } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LiaAngleUpSolid, LiaAngleDownSolid } from "react-icons/lia";
import NoResultIllustration, {
  SpinLoader,
} from "../../../../components/NoResult";
import { apiResponse, client } from "../../../../types/serviceUserTypes/health";
import { axiosInstance } from "../../../../Utils";
import { TextLabel } from "./Components/textLabel";
import { UpdateHealthRec } from "./UpdateHealthRec";
import { drawerState } from "../../../../atoms/drawerState";
import { UpdateHistoryModal } from "./Components/updateHistory";

interface PropType {
  client: client;
}

export default function Health({ client }: PropType) {
  const { id } = useParams();

  const [hide, setHide] = useState(false);
  const [show, setShow] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getUpdates, setGetUpdates] = useState<string | null>(null);
  const [record, setRecord] = useState<apiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<apiResponse | null>(
    null
  );

  const [_, setIsDrawerOpen] = useRecoilState(drawerState);

  const handleGetData = (e: React.MouseEvent, id: string, itemId: string) => {
    e.preventDefault();

    if (getUpdates === id) {
      setGetUpdates(null);
      setIsDrawerOpen(false);
      setSelectedId(null);
    } else {
      setSelectedId(itemId);
      setGetUpdates(id);
      const selected = record.find((rec) => rec.id === itemId);
      setSelectedRecord(selected || null);
      setIsDrawerOpen(true);
    }
  };

  const navigate = useNavigate();

  const handleToggle = (id: string) => {
    if (show === id) {
      setShow(null);
    } else {
      setShow(id);
    }
  };

  const navToUpdateHealth = () => {
    navigate(`/dashboard/user/${id}/update/1`);
    setHide(true);
  };

  const getHealthRecord = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/serviceuser-healthsummaryrecord/${id}`
      );
      setRecord(res?.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHealthRecord();
  }, [id]);

  const formattedValue = (value: string) => {
    return value.replace(/-/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const NHRID = formattedValue(client?.id || "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexDirection: "column",
          display: "flex",
          background: "white",
          px: 3,
          pb: 3,
          borderRadius: 2,
          gap: 3,
          width: "70%",
        }}
      >
        <div style={{ marginBottom: "50px" }}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            position={"absolute"}
            p={1.5}
            display={"flex"}
            right={0}
          >
            <Button
              variant="contained"
              sx={{
                color: "#FFF",
                outline: "none",
                textTransform: "capitalize",
                fontWeight: 600,
                background: "#099250",
                "&:hover": { backgroundColor: "#099250" },
              }}
              onClick={navToUpdateHealth}
              disabled={hide}
            >
              Add New
            </Button>
          </Stack>
        </div>

        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            {record.length > 0 ? (
              record?.map((item, index) => (
                <Box key={index}>
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      userSelect: "none",
                      fontWeight: 500,
                      justifyContent: "space-between",
                      border: "1px #E4E7EC solid",
                      textTransform: "capitalize",
                      // color: "#099250",
                    }}
                    fullWidth
                    onClick={() => handleToggle(`${item?.type}${index}`)}
                  >
                    <Box className="flex flex-col text-left">
                      <Box className="flex gap-2 items-center">
                        <p className="text-[14px] font-[600] text-gray-500">
                          {item?.type}
                        </p>

                        {item.treatmentStatus !== null && <LuDot />}
                        <p
                          className={classNames(
                            "font-[600]",
                            item.treatmentStatus?.toLowerCase() === "pending"
                              ? "text-[#475367]"
                              : item.treatmentStatus?.toLowerCase() === "active"
                              ? "text-[#099137]"
                              : item.treatmentStatus?.toLowerCase() ===
                                "on_hold"
                              ? "text-[#DD900D]"
                              : item.treatmentStatus?.toLowerCase() ===
                                "completed"
                              ? "text-[#1570EF]"
                              : item.treatmentStatus?.toLowerCase() ===
                                "cancelled"
                              ? "text-[#CB1A14]"
                              : ""
                          )}
                        >
                          {item?.treatmentStatus}
                        </p>
                      </Box>
                      <span className="text-[1rem] font-[600] text-[#090816]">
                        {item.type === "primary diagnosis"
                          ? item.primaryDiagnosis
                          : item.type === "secondary diagnosis"
                          ? item.secondaryDiagnosis
                          : item.type === "genotype"
                          ? item.genotype
                          : item.type === "blood group"
                          ? item.bloodGroup
                          : null}
                      </span>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <UpdateHealthRec
                        id={selectedId as string}
                        disableDrawer={item.treatmentStatus === "completed"}
                        getData={(e) =>
                          handleGetData(e, `${item?.type}${index}`, item?.id)
                        }
                        refreshData={() => getHealthRecord()}
                        sickness={
                          selectedRecord?.secondaryDiagnosis
                            ? selectedRecord?.secondaryDiagnosis
                            : selectedRecord?.primaryDiagnosis
                        }
                        notes={selectedRecord?.notes}
                        severity={selectedRecord?.severity}
                        treatmentType={selectedRecord?.treatmentType}
                        followUpPlans={selectedRecord?.followUpPlans}
                        treatmentStatus={selectedRecord?.treatmentStatus}
                      />

                      <span>
                        {show === `${item?.type}${index}` ? (
                          <LiaAngleUpSolid color="black" />
                        ) : (
                          <LiaAngleDownSolid color="black" />
                        )}
                      </span>
                    </Box>
                  </Button>

                  {show === `${item?.type}${index}` && (
                    <div style={{ padding: 6 }}>
                      <Box
                        sx={{
                          display: "grid",
                          columnGap: 1.5,
                          rowGap: 1.5,
                          gridTemplateColumns: {
                            xs: "repeat(1, 1fr)",
                            lg: "repeat(3, 1fr)",
                          },
                        }}
                      >
                        <TextLabel
                          label="Date Created"
                          text={
                            moment(item.date_created).format("DD/MM/YYYY") ||
                            "None"
                          }
                        />
                        <TextLabel
                          label="Type"
                          text={item.categories || "None"}
                        />

                        {/* VITALS DATA VIEW*/}
                        {item.type === "blood pressure" && (
                          <TextLabel
                            label="Systolic Reading"
                            text={item.systolic}
                          />
                        )}

                        {item.type === "blood pressure" && (
                          <TextLabel
                            label="Diastolic Reading"
                            text={item.diasttolic}
                          />
                        )}

                        {item.type === "body temperature" && (
                          <TextLabel
                            label="Reading"
                            text={
                              `${item.reading} ${item.degreeRating}` || "N/A"
                            }
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
                          <TextLabel
                            label="Blood Group"
                            text={item.bloodGroup}
                          />
                        )}

                        {item.type === "genotype" && (
                          <TextLabel
                            label="Genotype"
                            text={item.genotype || "N/A"}
                          />
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
                            text={moment(item.administrationDate).format(
                              "DD/MM/YYYY"
                            )}
                          />
                        )}

                        {item.categories === "immunization" && (
                          <TextLabel
                            label="Expiration Date"
                            text={moment(item.expirationDate).format(
                              "DD/MM/YYYY"
                            )}
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
                          <TextLabel
                            label="Severity"
                            text={item.severity || "N/A"}
                          />
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
                          <TextLabel
                            label="Clinical notes"
                            text={item.progressNote}
                          />
                        )}
                      </Box>

                      <TextLabel
                        label="Additional Notes"
                        text={item.notes || "None"}
                      />

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

                        {/* SHOW UPDATE HISTORY HERE -- WITH CONDITIONS*/}
                        <button
                          onClick={() => setOpenModal(true)}
                          className="text-pri-600 mt-10 font-[600]"
                        >
                          view history
                        </button>
                      </div>
                    </div>
                  )}
                  <UpdateHistoryModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                  />
                </Box>
              ))
            ) : (
              <NoResultIllustration text={"No record found"} />
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          borderLeft: "1px #E4E7EC solid",
          background: "white",
          p: 3,
          width: "30%",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 4,
          }}
        >
          <Avatar />
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
              Created: {moment(client?.date_created).format("LL")}
            </span>
          </div>
        </Box>

        <Divider />

        <Box>
          <Typography
            fontWeight={600}
            fontSize={18}
            color={"#101928"}
            sx={{ py: 2 }}
          >
            Demographics
          </Typography>
          <Divider />

          <TextLabel isLoading={isLoading} label="NHR ID" text={NHRID} />

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
          <TextLabel
            isLoading={isLoading}
            label="Age"
            text={moment(new Date()).diff(client?.dateOfBirth, "years")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Date of Birth"
            text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
          />
          <TextLabel
            isLoading={isLoading}
            label="Height"
            text={client?.height + "" + "cm"}
          />
          <TextLabel
            isLoading={isLoading}
            label="Weight"
            text={client?.weight + "" + "kg"}
          />
          <TextLabel
            isLoading={isLoading}
            label="HMO Plan"
            text={client?.HMOPlan || "None"}
          />
        </Box>
        <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />
      </Box>
    </Box>
  );
}
