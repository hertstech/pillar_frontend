import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import classNames from "classnames";
import { LuDot } from "react-icons/lu";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import NoResultIllustration, {
  SpinLoader,
} from "../../../../components/NoResult";
import { apiResponse, client } from "../../../../types/serviceUserTypes/health";
import { axiosInstance } from "../../../../Utils";
import { TextLabel } from "./Components/textLabel";
import { UpdateHealthRec } from "./UpdateHealthRec";
import { drawerState } from "../../../../atoms/drawerState";
import { HealthRecordOverview } from "./HealthRecordView";
import DrawerComp from "../../../../components/Drawer";

interface PropType {
  client: client;
}

export default function Health({ client }: PropType) {
  const { id } = useParams();

  const [hide, setHide] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [getUpdates, setGetUpdates] = useState<string | null>(null);
  const [record, setRecord] = useState<apiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<apiResponse | null>(
    null
  );

  const [_, setIsDrawerOpen] = useRecoilState(drawerState);

  const handleToggle = (itemId: string) => {
    setSelectedId(itemId);
    const selected = record.find((rec) => rec.id === itemId);
    setSelectedRecord(selected || null);
    setOpenDrawer(!openDrawer);
  };

  const handleGetDataForUpdate = (
    e: React.MouseEvent,
    id: string,
    itemId: string
  ) => {
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
                      borderRadius: "12px",
                    }}
                    fullWidth
                    onClick={() => handleToggle(item.id)}
                  >
                    <Box className="flex flex-col text-left">
                      <Box className="flex gap-2 items-center">
                        <p className="text-[14px] font-[400] text-gray-500">
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
                          {item?.treatmentStatus === "on_hold"
                            ? "On Hold"
                            : item.treatmentStatus}
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
                      {item.type === "primary diagnosis" ||
                      item.type === "secondary diagnosis" ? (
                        <UpdateHealthRec
                          id={selectedId as string}
                          disableDrawer={item.treatmentStatus === "completed"}
                          getData={(e: any) =>
                            handleGetDataForUpdate(
                              e,
                              `${item?.type}${index}`,
                              item?.id
                            )
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
                      ) : null}
                      <span>
                        <LiaAngleRightSolid color="black" />
                      </span>
                    </Box>
                  </Button>

                  <DrawerComp
                    variant="plain"
                    openDrawer={openDrawer && selectedId === item.id}
                    onCloseDrawer={() => setOpenDrawer(false)}
                  >
                    <HealthRecordOverview
                      id={selectedId as string}
                      data={selectedRecord}
                      disableDrawer={false}
                      handleCloseDrawer={() => setOpenDrawer(false)}
                    />
                  </DrawerComp>
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
          <Avatar sx={{ bgcolor:'#B2DDFF' }}>{client?.firstName.slice(0, 1)}</Avatar>
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
