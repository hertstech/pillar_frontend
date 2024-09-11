import {
  Box,
  Stack,
  Button,
  Card,
  TextField,
  MenuItem,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import Styles from "./styles.module.css";
import NoResultIllustration, { SpinLoader } from "../../../components/NoResult";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import InputField, { TextLabel } from "../../../components/InputField";
import {
  certainty,
  reaction,
  reactionType,
  reportedBy,
  severity,
  substance,
} from "./shared";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../Utils";
// import Swal from "sweetalert2";
import moment from "moment";

interface FormState {
  substance: string;
  reactionType: string;
  reaction: string;
  severity: string;
  certainty: string;
  evidence: string;
  reportedBy: string;
  relativeName: string;
  notes: string;
}

interface apiResponse {
  certainty: string;
  date_created: string;
  evidence: string;
  id: string;
  notes: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  reaction: string;
  reactionType: string;
  relativeName: string;
  reportedBy: string;
  serviceuser_id_fk: string;
  severity: string;
  substance: string;
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

export default function Allergies({ client }: PropType) {
  const [hide, setHide] = useState(false);

  const [show, setShow] = useState("");

  const [formField, setFormField] = useState<FormState[]>([]);

  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();

  const [record, setRecord] = useState<apiResponse[]>([]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const navToUpdateAllergy = () => {
    navigate(`/dashboard/user/${id}/update/3`);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
    setHide(false);
  };

  const handleToggle = (index: any) => {
    setShow((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const getAllergy = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/serviceuser-allergiesrecord/${id}`);

      setRecord(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllergy();
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
              onClick={navToUpdateAllergy}
              disabled={hide}
            >
              Add New
            </Button>
          </Stack>
        </div>

        {formField.map((form: any, index: any) => (
          <form>
            <Card sx={{ p: 2 }}>
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
                <label htmlFor={`substance_${index}`}>
                  Substance
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`substance_${index}`}
                    value={form.substance}
                    onChange={(e) =>
                      handleFormChange(index, "substance", e.target.value)
                    }
                  >
                    {substance.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label htmlFor={`reactionType_${index}`}>
                  Reaction Type
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`reactionType_${index}`}
                    value={form.reactionType}
                    onChange={(e) =>
                      handleFormChange(index, "reactionType", e.target.value)
                    }
                  >
                    {reactionType.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label htmlFor={`reaction_${index}`}>
                  Reaction
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`reaction_${index}`}
                    value={form.reaction}
                    onChange={(e) =>
                      handleFormChange(index, "reaction", e.target.value)
                    }
                  >
                    {reaction.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label
                  htmlFor={`severity_${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Severity
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`severity_${index}`}
                    value={form.severity}
                    onChange={(e) =>
                      handleFormChange(index, "severity", e.target.value)
                    }
                  >
                    {severity.default.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label
                  htmlFor={`certainty_${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Certainty
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`certainty_${index}`}
                    value={form.certainty}
                    onChange={(e) =>
                      handleFormChange(index, "certainty", e.target.value)
                    }
                  >
                    {certainty.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <InputField
                  type="text"
                  label="Evidence"
                  name={`evidence_${index}`}
                  value={form.evidence}
                  onChange={(e: any) =>
                    handleFormChange(index, "evidence", e.target.value)
                  }
                />

                <label htmlFor={`reportedBy_${index}`}>
                  Reported By
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name={`reportedBy_${index}`}
                    value={form.reportedBy}
                    onChange={(e) =>
                      handleFormChange(index, "reportedBy", e.target.value)
                    }
                  >
                    {reportedBy.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              </Box>

              <InputField
                type="text"
                label="Name"
                name={`relativeName_${index}`}
                value={form.relativeName}
                onChange={(e: any) =>
                  handleFormChange(index, "relativeName", e.target.value)
                }
              />

              <label htmlFor="notes" style={{ marginTop: "8px" }}>
                Notes
                <textarea
                  className={Styles.area}
                  name={`notes_${index}`}
                  rows={4}
                  cols={50}
                  value={form.notes}
                  onChange={(e) =>
                    handleFormChange(index, "notes", e.target.value)
                  }
                ></textarea>
              </label>

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

        {/* INITIAL STATE WHEN EMPTY */}
        {/* {!hide && record.length <= 0 && (
          <NoResultIllustration text={"No record found"} />
        )} */}

        {isLoading ? (
          <SpinLoader />
        ) : (
          <>
            {record.length > 0 ? (
              record.map((item, index) => (
                <Box key={index}>
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      userSelect: "none",
                      fontSize: 18,
                      justifyContent: "space-between",
                      border: "1px #E4E7EC solid",
                      textTransform: "capitalize",
                      color: "#099250",
                    }}
                    fullWidth
                    onClick={() => handleToggle(`${item?.substance}${index}`)}
                  >
                    <span>{item?.substance}</span>
                    <span>
                      {show === `${item?.substance}${index}` ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </span>
                  </Button>

                  {show === `${item?.substance}${index}` && (
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
                          label="Reaction Type"
                          text={item.reactionType || "None"}
                        />
                        <TextLabel
                          label="Reaction"
                          text={item.reaction || "None"}
                        />
                        <TextLabel
                          label="Severity"
                          text={item.severity || "None"}
                        />
                        <TextLabel
                          label="Certainty"
                          text={item.certainty || "None"}
                        />
                        <TextLabel
                          label="EVidence"
                          text={item.evidence || "None"}
                        />
                        <TextLabel
                          label="Reported by"
                          text={item.reportedBy || "None"}
                        />

                        <TextLabel
                          label="Name of reporter"
                          text={item.relativeName || "None"}
                        />
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
                        <Typography fontWeight={400} fontSize={16}>
                          Report created on{" "}
                          {moment(item.date_created).format("DD/MM/YYYY")} by
                          ID: #{item.pillar_user_id_fk}
                        </Typography>
                      </div>
                    </div>
                  )}
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
        <Divider />
      </Box>
    </Box>
  );
}
