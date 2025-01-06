import {
  Stack,
  Box,
  Button,
  Card,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import NoResultIllustration, { SpinLoader } from "../../../components/NoResult";
import { useEffect, useState } from "react";
import InputField, { TextLabel } from "../../../components/InputField";
import Styles from "./styles.module.css";
import { axiosInstance } from "../../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

interface FormState {
  writtenBy: string;
  additionalNote: string;
}

interface apiResponse {
  additionalNote: string;
  writtenBy: string;
  date_created: string;
  id: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  serviceuser_id_fk: string;
}

interface client {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  lga: string;
  dateOfBirth: Date;
  height: number;
  weight: number;
  HMOPlan: string;
  firstName: string;
  lastName: string;
  state: string;
  gender: string;
  religion: string;
  date_created: string;
  tribalMarks: string;
  parentOne: string;
  parentOneNumber: string;
  parentOneNHR_ID: string;
  parentOneRelationship: string;
  parentTwo: string;
  parentTwoNumber: string;
  parentTwoNHR_ID: string;
  parentTwoRelationship: string;
  nominatedPharmarcy: string;
  registeredDoctor: string;
  nokFullName: string;
  nokNHR_ID: string;
  nokPhoneNumber: string;
  nokRelationship: string;
}
interface PropType {
  client: client;
}

export default function Notes({ client }: PropType) {
  const [hide, setHide] = useState(false);

  const [formField, setFormField] = useState<FormState[]>([]);

  const [record, setRecord] = useState<apiResponse[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const navToUpdateNotes = () => {
    navigate(`/dashboard/user/${id}/update/5`);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
    setHide(false);
  };

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/serviceuser-addtionalnotes/${id}`);

      setRecord(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, [id]);

  const handleFormChange = (index: number, field: any, value: any) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms[index] = {
        ...newForms[index],
        [field]: value,
      };
      return newForms;
    });
  };

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
              onClick={navToUpdateNotes}
              disabled={hide}
            >
              Add New
            </Button>
          </Stack>
        </div>

        {formField.map((form: any, index: any) => (
          <form>
            <Card sx={{ p: 2 }}>
              <label
                htmlFor="additional notes"
                style={{ marginTop: "8px", marginBottom: 10 }}
              >
                Additional Notes
                <textarea
                  className={Styles.area}
                  name={`additionalNote_${index}`}
                  rows={8}
                  cols={50}
                  value={form.additionalNote}
                  onChange={(e) =>
                    handleFormChange(index, "additionalNote", e.target.value)
                  }
                ></textarea>
              </label>

              <div style={{ marginTop: 10 }}>
                <InputField
                  type="text"
                  label="Notes by"
                  name={`writtenBy_${index}`}
                  value={form.writtenBy}
                  onChange={(e: any) =>
                    handleFormChange(index, "writtenBy", e.target.value)
                  }
                />
              </div>

              <Stack
                direction="row"
                justifyContent="flex-end"
                marginTop={2}
                gap={5}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteForm(index)}
                >
                  Delete Form
                </Button>
                <Button
                  sx={{
                    color: "#FFF",
                    outline: "none",
                    fontWeight: 600,
                    background: "#099250",
                    "&:hover": { backgroundColor: "#099250" },
                    px: 3,
                  }}
                  variant="outlined"
                  // onClick={() => setIsOpen(true)}
                >
                  Continue
                </Button>
              </Stack>
            </Card>
          </form>
        ))}

        {/* {!hide && record.length <= 0 && (
          <NoResultIllustration text={"No record found"} />
        )} */}

        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            {record.length > 0 ? (
              record.map((item, index) => (
                <Card sx={{ p: 2 }} key={index}>
                  <TextLabel label="Note" text={item.additionalNote} />
                  <TextLabel label="Written By" text={item.writtenBy} />
                </Card>
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
            Profile
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
        <Divider />
      </Box>
    </Box>
  );
}
