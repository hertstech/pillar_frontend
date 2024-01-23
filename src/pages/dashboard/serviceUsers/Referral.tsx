import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";
import Styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Calendar } from "../../../components/CalendarField";
import InputField, { TextLabel } from "../../../components/InputField";
import ReferralPReview from "./ReferralPReview";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../Utils/axios";
import Swal from "sweetalert2";
import moment from "moment";

interface FormState {
  dateInitiated: string;
  careSetting: string;
  referralSource: string;
  referralName: string;
  referralReason: string;
  urgencyStatus: string;
  waitingStatus: string;
  teamReferredTo: string;
  referralDateReceived: string;
  referralAcceptedDate: string;
  additionalNote: string;
}

interface apiResponse {
  additionalNote: string;
  careSetting: string;
  dateInitiated: string;
  date_created: string;
  id: string;
  pillar_faclityname_fk: string;
  pillar_user_id_fk: string;
  referralComment: string;
  referralDateReceived: string;
  referralName: string;
  referralReason: string;
  referralSource: string;
  serviceuser_id_fk: string;
  teamReferredTo: string;
  urgencyStatus: string;
  waitingStatus: string;
}

const initialFormState = {
  dateInitiated: "",
  careSetting: "",
  referralSource: "",
  referralName: "",
  referralReason: "",
  urgencyStatus: "",
  waitingStatus: "",
  teamReferredTo: "",
  referralDateReceived: "",
  referralAcceptedDate: "",
  additionalNote: "",
};

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

export default function Referral({ client }: PropType) {
  const [hide, setHide] = useState(false);
  const [formField, setFormField] = useState<FormState[]>([]);

  const [show, setShow] = useState("");

  const [record, setRecord] = useState<apiResponse[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const addForm = () => {
    // Check if any of the form fields have a value
    const isFormEmpty = Object.values(formField).every((value) => !value);

    if (!isFormEmpty) {
      // If any form field has a value, disable the "Add New" button
      return;
    }

    setHide(true);
    setFormField((prevForms) => [...prevForms, { ...initialFormState }]);
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

  const getHealthRecord = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/serviceuser-allergiesreferrals/${id}`
      );

      setRecord(res?.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const dataObject = formField[0];

    const areCategoriesAndTypeEmpty = (formStateArray: FormState[]) => {
      return formStateArray.every((formState) => {
        // Check if both 'care setting' and  are empty
        return formState.careSetting.trim() === "";
      });
    };

    // Example usage
    const areEmpty = areCategoriesAndTypeEmpty(formField);

    if (areEmpty) {
      setIsLoading(false);

      setIsOpen(false);
      return Swal.fire({
        icon: "info",
        text: `You can not submit an empty form!`,
        confirmButtonColor: "#099250",
      });
    }

    try {
      const res = await axiosInstance.post(
        `/create-serviceuser-referralrecord/${id}`,
        dataObject
      );

      setIsOpen(false);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });

      getHealthRecord();

      setFormField([]);
      setHide(false);
    } catch (error: any) {
      error;
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
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
              onClick={addForm}
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
                <Calendar
                  label="Date of Referral"
                  value={form.dateInitiated}
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(index, "dateInitiated", newValue.format())
                  }
                />

                <label htmlFor="care_setting" style={{ marginTop: 10 }}>
                  Care Setting
                  <TextField
                    select
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    name={`careSetting_${index}`}
                    value={form.careSetting}
                    onChange={(e) =>
                      handleFormChange(index, "careSetting", e.target.value)
                    }
                  >
                    <MenuItem value="Community">Community</MenuItem>
                    <MenuItem value="Primary Care">Primary Care</MenuItem>
                  </TextField>
                </label>

                <div style={{ marginTop: 5 }}>
                  <InputField
                    type="text"
                    label="Referral (Name of referral)"
                    name={`referralName_${index}`}
                    value={form.referralName}
                    onChange={(e: any) =>
                      handleFormChange(index, "referralName", e.target.value)
                    }
                  />
                  {/* <InputField
                  type="text"
                  label="Referral Source (Name of Hospital)"
                  name={`referralSource_${index}`}
                  value={form.referralSource}
                  onChange={(e: any) =>
                    handleFormChange(index, "referralSource", e.target.value)
                  }
                /> */}
                </div>

                <label htmlFor="referral_reason" style={{ marginTop: 5 }}>
                  Referral reason
                  <TextField
                    select
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    name={`referralReason_${index}`}
                    value={form.referralReason}
                    onChange={(e) =>
                      handleFormChange(index, "referralReason", e.target.value)
                    }
                  >
                    <MenuItem value="Complex condition Diagnostic procedure">
                      Complex condition Diagnostic procedure
                    </MenuItem>
                    <MenuItem value="Surgery">Surgery</MenuItem>
                    <MenuItem value="Specialized Care">
                      Specialized Care
                    </MenuItem>
                    <MenuItem value="Maternity Care">Maternity Care</MenuItem>
                  </TextField>
                </label>

                <label htmlFor="urgency_status" style={{ marginTop: 5 }}>
                  Urgency Status
                  <TextField
                    select
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    name={`urgencyStatus_${index}`}
                    value={form.urgencyStatus}
                    onChange={(e) =>
                      handleFormChange(index, "urgencyStatus", e.target.value)
                    }
                  >
                    <MenuItem value="Emergency">Emergency</MenuItem>
                    <MenuItem value="Non-Urgent">Non-Urgent</MenuItem>
                    <MenuItem value="Routine">Routine</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                  </TextField>
                </label>

                <label htmlFor="waiting_status" style={{ marginTop: 5 }}>
                  Waiting Status
                  <TextField
                    select
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    name={`waitingStatus_${index}`}
                    value={form.waitingStatus}
                    onChange={(e) =>
                      handleFormChange(index, "waitingStatus", e.target.value)
                    }
                  >
                    <MenuItem value="Waiting for response">
                      Waiting for response
                    </MenuItem>
                    <MenuItem value="Waiting for letter">
                      Waiting for letter
                    </MenuItem>
                    <MenuItem value="Cleared">Cleared</MenuItem>
                    <MenuItem value="Client unavailable">
                      Client unavailable
                    </MenuItem>
                    <MenuItem value="Under review">Under review</MenuItem>
                  </TextField>
                </label>

                <InputField
                  type="text"
                  label="Team referred to"
                  name={`teamReferredTo_${index}`}
                  value={form.teamReferredTo}
                  onChange={(e: any) =>
                    handleFormChange(index, "teamReferredTo", e.target.value)
                  }
                />

                <Calendar
                  label="Date Referral was Received"
                  value={form.referralDateReceived}
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(
                      index,
                      "referralDateReceived",
                      newValue.format()
                    )
                  }
                />

                <Calendar
                  label="Referral Accepted Date"
                  value={form.referralAcceptedDate}
                  disableFuture={false}
                  onChange={(newValue: any) =>
                    handleFormChange(
                      index,
                      "referralAcceptedDate",
                      newValue.format()
                    )
                  }
                />
              </Box>
              <label htmlFor="additional notes" style={{ marginTop: "8px" }}>
                Additional Notes
                <textarea
                  className={Styles.area}
                  name={`referralName_${index}`}
                  rows={5}
                  cols={50}
                  value={form.additionalNote}
                  onChange={(e) =>
                    handleFormChange(index, "additionalNote", e.target.value)
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
                  sx={{
                    color: "#FFF",
                    outline: "none",
                    fontWeight: 600,
                    background: "#099250",
                    "&:hover": { backgroundColor: "#099250" },
                    px: 3,
                  }}
                  variant="outlined"
                  onClick={() => setIsOpen(true)}
                >
                  Continue
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteForm(index)}
                >
                  Delete Form
                </Button>
              </Stack>
            </Card>
          </form>
        ))}

        {!hide && record?.length <= 0 && <NoResultIllustration />}

        {record.map((item, index) => (
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
              onClick={() => handleToggle(`${item?.urgencyStatus}${index}`)}
            >
              <span>{item?.urgencyStatus}</span>
              <span>
                {show === `${item?.urgencyStatus}${index}` ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}
              </span>
            </Button>

            {show === `${item?.urgencyStatus}${index}` && (
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
                      moment(item.date_created).format("DD/MM/YYYY") || "None"
                    }
                  />
                  <TextLabel
                    label="Care Setting"
                    text={item.careSetting || "None"}
                  />

                  <TextLabel
                    label="Referral Name"
                    text={item.referralName || "None"}
                  />
                  <TextLabel
                    label="Referral reason"
                    text={item.referralReason || "None"}
                  />
                  <TextLabel
                    label="Waiting Status"
                    text={item.waitingStatus || "None"}
                  />
                  <TextLabel
                    label="Team referred to"
                    text={item.teamReferredTo || "None"}
                  />
                  <TextLabel
                    label="Date referral was received"
                    text={
                      moment(item.referralDateReceived).format("DD/MM/YYYY") ||
                      "None"
                    }
                  />
                </Box>
                <TextLabel
                  label="Additional Notes"
                  text={item.additionalNote || "None"}
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
        ))}

        {formField.map((form, index) => (
          <ReferralPReview
            key={index}
            dateInitiated={form.dateInitiated}
            careSetting={form.careSetting}
            referralSource={form.referralSource}
            referralName={form.referralName}
            referralReason={form.referralReason}
            urgencyStatus={form.urgencyStatus}
            waitingStatus={form.waitingStatus}
            teamReferredTo={form.teamReferredTo}
            referralDateReceived={form.referralDateReceived}
            referralAcceptedDate={form.referralAcceptedDate}
            additionalNote={form.additionalNote}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ))}
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
