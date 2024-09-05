import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "../styles.module.css";
import InputField from "../../../../components/InputField";
import categories from "../../../../../categories.json";
import { useEffect, useState } from "react";
import NoResultIllustration, {
  SpinLoader,
} from "../../../../components/NoResult";
import { LiaAngleUpSolid, LiaAngleDownSolid } from "react-icons/lia";
import { Calendar } from "../../../../components/CalendarField";
import {
  bloodGroups,
  followUpPlans,
  primaryDiagnosis,
  secondaryDiagnosis,
  severity,
  treatmentStatus,
  treatmentType,
} from "../shared";
import { axiosInstance } from "../../../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import classNames from "classnames";
import { LuDot } from "react-icons/lu";
import { UpdateHealthRec } from "./UpdateHealthRec";

const title = ["Dr.", "Mrs.", "Ms."];

interface FormState {
  categories: string;
  type: string;
  bloodGroup: string;
  genotype: string;
  manufacturer: string;
  batchNumber: string;
  administrationDate: string;
  expirationDate: string;
  reading: string;
  notes: string;
  systolic: string;
  diasttolic: string;
  bpm: string;
  title: string;
  mgDl: string;
  degreeRating: string;
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  progressNote: string;
}

interface apiResponse {
  systolic: string;
  diasttolic: string;
  bpm: string;
  mgDl: string;
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  severity: string;
  treatmentStatus: string;
  treatmentType: string;
  followUpPlans: string;
  title: string;
  progressNote: string;
  degreeRating: string;
  administrationDate: string;
  batchNumber: string;
  bloodGroup: string;
  categories: string;
  date_created: string;
  expirationDate: string;
  genotype: string;
  id: string;
  manufacturer: string;
  notes: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  reading: string;
  serviceuser_id_fk: string;
  type: string;
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

interface TextLabelProps {
  text: any;
  label: string;
  isLoading?: boolean;
}

const TextLabel = ({ text, label, isLoading }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 400,
      color: "#475467",
      fontSize: 12,
      margin: "20px 0px",
    }}
  >
    {label}
    {isLoading ? (
      <Skeleton
        variant="text"
        animation="wave"
        width={300}
        sx={{ fontSize: "18px" }}
      />
    ) : (
      <Typography
        sx={{
          "&::first-letter": {
            textTransform: "uppercase",
          },
          mt: "4px",
          fontWeight: "fontBold ",
        }}
        fontSize={16}
        color={"#101928"}
      >
        {text}
      </Typography>
    )}
  </label>
);

export default function Health({ client }: PropType) {
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState<string | null>(null);
  const [formField, setFormField] = useState<FormState[]>([]);
  const [record, setRecord] = useState<apiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleToggle = (id: string, itemId: string) => {
    if (show === id) {
      setShow(null);
      setSelectedId(null);
    } else {
      setShow(id);
      setSelectedId(itemId);
    }
  };

  const navToUpdateHealth = () => {
    navigate(`/dashboard/user/${id}/update/1`);
  };

  const deleteForm = (index: number) => {
    setFormField((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
    setHide(false);
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
              onClick={navToUpdateHealth}
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
                <label
                  htmlFor={`category_${index}`}
                  style={{ marginTop: "10px" }}
                >
                  Category
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="categories"
                    value={form.categories}
                    onChange={(e) =>
                      handleFormChange(index, "categories", e.target.value)
                    }
                  >
                    {categories.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <label htmlFor={`types${index}`} style={{ marginTop: "10px" }}>
                  Type
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="type"
                    value={form.type}
                    onChange={(e) =>
                      handleFormChange(index, "type", e.target.value)
                    }
                  >
                    {categories
                      ?.find((category) => category.name === form.categories)
                      ?.type.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item ? item : ""}
                        </MenuItem>
                      ))}
                  </TextField>
                </label>

                {form.categories === "Vitals" &&
                  form.type === "Blood pressure" && (
                    <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                      <InputField
                        type="text"
                        label="Systolic"
                        name={`systolic_${index}`}
                        value={form.systolic}
                        onChange={(e: any) =>
                          handleFormChange(index, "systolic", e.target.value)
                        }
                      />

                      <InputField
                        type="text"
                        label="Diastolic"
                        name={`diasttolic_${index}`}
                        value={form.diasttolic}
                        onChange={(e: any) =>
                          handleFormChange(index, "diasttolic", e.target.value)
                        }
                      />
                    </div>
                  )}

                {form.categories === "Vitals" && form.type === "Pulse Rate" && (
                  <div style={{ marginTop: "5px" }}>
                    <InputField
                      type="text"
                      label="bpm"
                      name={`bpm_${index}`}
                      value={form.bpm}
                      onChange={(e: any) =>
                        handleFormChange(index, "bpm", e.target.value)
                      }
                    />
                  </div>
                )}

                {form.categories === "Vitals" &&
                  form.type === "Glucose Level" && (
                    <div style={{ marginTop: "5px" }}>
                      <InputField
                        type="text"
                        label="mg/dl"
                        name={`mgDl_${index}`}
                        value={form.mgDl}
                        onChange={(e: any) =>
                          handleFormChange(index, "mgDl", e.target.value)
                        }
                      />
                    </div>
                  )}

                {form.categories === "Vitals" &&
                  form.type === "Body Temperature" && (
                    <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                      <InputField
                        type="text"
                        label="Reading"
                        name={`reading_${index}`}
                        value={form.reading}
                        onChange={(e: any) =>
                          handleFormChange(index, "reading", e.target.value)
                        }
                      />

                      <label
                        htmlFor={`degreeRating${index}`}
                        style={{ marginTop: "10px" }}
                      >
                        <TextField
                          select
                          sx={{ marginTop: "19px", marginRight: "32px" }}
                          fullWidth
                          name="degreeRating"
                          value={form.degreeRating}
                          onChange={(e) =>
                            handleFormChange(
                              index,
                              "degreeRating",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="&deg;C">&deg;C</MenuItem>
                          <MenuItem value="&deg;F">&deg;F</MenuItem>
                        </TextField>
                      </label>
                    </div>
                  )}

                {form.categories === "Genetic Information" &&
                  form.type === "Blood Group" && (
                    <label
                      htmlFor={`bloodGroup${index}`}
                      style={{ marginTop: "10px" }}
                    >
                      Blood Group
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="bloodGroup"
                        value={form.bloodGroup}
                        onChange={(e) =>
                          handleFormChange(index, "bloodGroup", e.target.value)
                        }
                      >
                        {bloodGroups.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  )}

                {form.categories === "Genetic Information" &&
                  form.type === "Genotype" && (
                    <label
                      htmlFor={`genotype${index}`}
                      style={{ marginTop: "10px" }}
                    >
                      Genotype
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="genotype"
                        value={form.genotype}
                        onChange={(e) =>
                          handleFormChange(index, "genotype", e.target.value)
                        }
                      >
                        <MenuItem value="AA">AA</MenuItem>
                        <MenuItem value="AS">AS</MenuItem>
                        <MenuItem value="SS">SS</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </label>
                  )}

                {form.categories === "Immunization" && (
                  <label
                    htmlFor={`manufacturer${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Manufacturer
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="manufacturer"
                      value={form.manufacturer}
                      onChange={(e) =>
                        handleFormChange(index, "manufacturer", e.target.value)
                      }
                    >
                      <MenuItem value="Lonza">Lonza</MenuItem>
                      <MenuItem value="Pfizer">Pfizer</MenuItem>
                      <MenuItem value="Sanofi">Sanofi</MenuItem>
                      <MenuItem value="Moderna">Moderna</MenuItem>
                      <MenuItem value="Sinovac">Sinovac</MenuItem>
                    </TextField>
                  </label>
                )}

                {form.categories === "Immunization" && (
                  <div style={{ marginTop: "5px" }}>
                    <InputField
                      type="text"
                      label="Batch Number"
                      name={`batchNumber_${index}`}
                      value={form.batchNumber}
                      onChange={(e: any) =>
                        handleFormChange(index, "batchNumber", e.target.value)
                      }
                    />
                  </div>
                )}

                {form.categories === "Immunization" && (
                  <Calendar
                    label="Administration Date"
                    value={form.administrationDate}
                    disableFuture={false}
                    onChange={(newValue: any) =>
                      handleFormChange(
                        index,
                        "administrationDate",
                        newValue.format()
                      )
                    }
                  />
                )}

                {form.categories === "Immunization" && (
                  <Calendar
                    label="Expiration Date"
                    value={form.expirationDate}
                    minDate={dayjs(form.administrationDate)}
                    onChange={(newValue: any) =>
                      handleFormChange(
                        index,
                        "expirationDate",
                        newValue.format()
                      )
                    }
                  />
                )}

                {form.categories === "Diagnosis" &&
                  form.type === "Primary Diagnosis" && (
                    <label
                      htmlFor={`primaryDiagnosis${index}`}
                      style={{ marginTop: "10px" }}
                    >
                      Primary Diagnosis
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="primaryDiagnosis"
                        value={form.primaryDiagnosis}
                        onChange={(e) =>
                          handleFormChange(
                            index,
                            "primaryDiagnosis",
                            e.target.value
                          )
                        }
                      >
                        {primaryDiagnosis.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  )}

                {form.categories === "Diagnosis" &&
                  form.type === "Secondary Diagnosis" && (
                    <label
                      htmlFor={`secondaryDiagnosis${index}`}
                      style={{ marginTop: "10px" }}
                    >
                      Secondary Diagnosis
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="secondaryDiagnosis"
                        value={form.secondaryDiagnosis}
                        onChange={(e) =>
                          handleFormChange(
                            index,
                            "secondaryDiagnosis",
                            e.target.value
                          )
                        }
                      >
                        {secondaryDiagnosis.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  )}

                {form.categories === "Diagnosis" && (
                  <label
                    htmlFor={`severity${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Severity
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="severity"
                      value={form.severity}
                      onChange={(e) =>
                        handleFormChange(index, "severity", e.target.value)
                      }
                    >
                      {severity.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

                {form.categories === "Diagnosis" && (
                  <label
                    htmlFor={`treatmentStatus${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Treatment Status
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="treatmentStatus"
                      value={form.treatmentStatus}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "treatmentStatus",
                          e.target.value
                        )
                      }
                    >
                      {treatmentStatus.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

                {form.categories === "Diagnosis" && (
                  <label
                    htmlFor={`treatmentType${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Treatment Type
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="treatmentType"
                      value={form.treatmentType}
                      onChange={(e) =>
                        handleFormChange(index, "treatmentType", e.target.value)
                      }
                    >
                      {treatmentType.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}

                {form.categories === "Diagnosis" && (
                  <label
                    htmlFor={`followUpPlans${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Follow Up Plan
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="followUpPlans"
                      value={form.followUpPlans}
                      onChange={(e) =>
                        handleFormChange(index, "followUpPlans", e.target.value)
                      }
                    >
                      {followUpPlans.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                )}
              </Box>

              {form.categories === "Diagnosis" && (
                <div style={{ marginTop: "5px", display: "flex", gap: 5 }}>
                  <label
                    htmlFor={`title${index}`}
                    style={{ marginTop: "10px" }}
                  >
                    Title
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="title"
                      value={form.title}
                      onChange={(e) =>
                        handleFormChange(index, "title", e.target.value)
                      }
                    >
                      {title.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>
                  <InputField
                    type="text"
                    label="Name"
                    name={`reading_${index}`}
                    value={form.reading}
                    onChange={(e: any) =>
                      handleFormChange(index, "reading", e.target.value)
                    }
                  />
                </div>
              )}

              {form.categories === "Diagnosis" && (
                <label htmlFor="notes" style={{ marginTop: "10px" }}>
                  Clinical Notes
                  <textarea
                    className={Styles.area}
                    name={`progressNote_${index}`}
                    rows={4}
                    cols={50}
                    value={form.progressNote}
                    onChange={(e: any) =>
                      handleFormChange(index, "progressNote", e.target.value)
                    }
                  ></textarea>
                </label>
              )}

              <label htmlFor="notes" style={{ marginTop: "10px" }}>
                Additional Notes
                <textarea
                  className={Styles.area}
                  name={`notes_${index}`}
                  rows={7}
                  cols={50}
                  value={form.notes}
                  onChange={(e: any) =>
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
                    onClick={() =>
                      handleToggle(`${item?.type}${index}`, item.id)
                    }
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
                        refreshData={getHealthRecord}
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
        <Divider sx={{ position: "absolute", width: "100%", right: 0 }} />
      </Box>
    </Box>
  );
}