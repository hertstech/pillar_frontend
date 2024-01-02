import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  TextField,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import moment from "moment";
import InputField, { TextLabel } from "../../../components/InputField";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StatesData from "../../../../states.json";
import { MdEdit } from "react-icons/md";
import PhoneField from "../../../components/PhoneInput";
import Style from "./styles.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "../../../Utils/axios";
import Swal from "sweetalert2";
// import { useSelector } from "react-redux";

const relations = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "grand mother", label: "Grand Mother" },
  { value: "grand father", label: "Grand Father" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "aunty", label: "Aunty" },
  { value: "uncle", label: "Uncle" },
  { value: "guardian", label: "Guardian" },
  { value: "other", label: "Other" },
];

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
  isLoading: boolean;
}

export default function Demogrphics({ client, isLoading }: PropType) {
  // const client=useSelector((state: any) => state.client.clients.tab1[0])
  // console.log(client)
  const { id } = useParams();

  const [isLoad, setIsLoad] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [editForm, setEditForm] = useState({
    phoneNumber: client.phoneNumber,
    address: client.address,
    state: client.state,
    lga: client.lga,
    height: client.height,
    weight: client.weight,
    parentOne: client.parentOne,
    parentOneNumber: client.parentOneNumber,
    parentOneNHRID: client.parentOneNHR_ID,
    parentOneRelationship: client.parentOneRelationship,
    parentTwo: client.parentTwo,
    parentTwoNumber: client.parentTwoNumber,
    parentTwoNHRID: client.parentTwoNHR_ID,
    parentTwoRelationship: client.parentTwoRelationship,
    HMOPlan: client.HMOPlan,
    nominatedPharmarcy: client.nominatedPharmarcy,
    registeredDoctor: client.registeredDoctor,
  });

  const handleChange = (name: string, value: any) => {
    setEditForm({
      ...editForm,
      [name || ""]: value,
    });
  };

  const updateUser = async () => {
    setIsLoad(true);

    try {
      const res = await axiosInstance.put(
        `/update-serviceiuser-profile/${id}`,
        editForm
      );
      console.log(res.data);

      setShowEdit(false);
      setIsLoad(false);
      Swal.fire({
        icon: "success",
        title: `Successful`,
        text: `${res.data.message}`,
        confirmButtonColor: "#099250",
      });
    } catch (error: any) {
      console.error(error.response);
      setIsLoad(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        // text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        gap: 3,
        flexDirection: "column",
        display: "flex",
        mb: 7,
        background: "white",
        borderRadius: 2,
        px: 3,
        py: 2,
      }}
    >
      <div style={{ marginBottom: "0px" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          position={"absolute"}
          p={1.5}
          display={"flex"}
          right={0}
        >
          <Button
            // href={`/dashboard/user/${id}/edit`}
            variant="contained"
            sx={{
              color: "#FFF",
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
              gap: 1,
            }}
            onClick={() => setShowEdit(true)}
          >
            <MdEdit style={{ fontSize: 20 }} />
            Update Record
          </Button>
        </Stack>
      </div>
      <div>
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Personal Information
        </Typography>
        <Stack
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
            label="Full Name"
            text={client?.firstName + " " + client?.lastName}
            isLoading={isLoading}
          />
          <TextLabel
            label="Gender"
            text={client?.gender}
            isLoading={isLoading}
          />

          <TextLabel
            label="Religion"
            text={client?.religion}
            isLoading={isLoading}
          />
          <TextLabel
            label="Tribal Mark"
            text={client?.tribalMarks}
            isLoading={isLoading}
          />
        </Stack>
      </div>

      <div>
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Contact details
        </Typography>
        <TextLabel
          label="Address"
          text={client?.address}
          isLoading={isLoading}
        />
        <Stack
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
            label="State"
            text={client?.state || "Nill"}
            isLoading={isLoading}
          />
          <TextLabel
            label="LGA"
            text={client?.lga || "Nill"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Date of Birth"
            text={moment(client?.dateOfBirth).format("DD/MM/YYYY")}
            isLoading={isLoading}
          />
          <TextLabel
            label="Age"
            text={moment(new Date()).diff(client?.dateOfBirth, "years")}
            isLoading={isLoading}
          />
          <TextLabel
            label="Email Address"
            text={client?.email || "None"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Phone Number"
            text={client?.phoneNumber}
            isLoading={isLoading}
          />
        </Stack>
      </div>

      <div>
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Emergency Contact
        </Typography>
        <Stack>
          {!client?.parentOne || client?.parentOne === "" ? null : (
            <>
              <Typography fontWeight={500} fontSize={18}>
                Parent One
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1.5,
                  rowGap: 1.5,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                }}
              >
                <TextLabel
                  label="Full Name"
                  text={client?.parentOne || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Phone Number"
                  text={client?.parentOneNumber || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="NHR ID"
                  text={client?.parentOneNHR_ID || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Relationship"
                  text={client?.parentOneRelationship || "Not Available"}
                  isLoading={isLoading}
                />
              </Box>
            </>
          )}

          {!client?.parentTwo || client?.parentTwo === "" ? null : (
            <>
              <Typography sx={{ mt: 2 }} fontWeight={500} fontSize={18}>
                Parent Two
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1.5,
                  rowGap: 1.5,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                }}
              >
                <TextLabel
                  label="Parent Two"
                  text={client?.parentTwo || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Phone Number"
                  text={client?.parentTwoNumber || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="NHR ID"
                  text={client?.parentTwoNHR_ID || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Relationship"
                  text={client?.parentTwoRelationship || "Not Available"}
                  isLoading={isLoading}
                />
              </Box>
            </>
          )}

          {!client?.nokFullName || client?.nokFullName === "" ? null : (
            <>
              <Typography sx={{ mt: 2 }} fontWeight={500} fontSize={18}>
                Next of Kin
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1.5,
                  rowGap: 1.5,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                }}
              >
                <TextLabel
                  label="Next of Kin"
                  text={client?.nokFullName || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Phone Number"
                  text={client?.nokPhoneNumber || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="NHR ID"
                  text={client?.nokNHR_ID || "Not Available"}
                  isLoading={isLoading}
                />
                <TextLabel
                  label="Relationship"
                  text={client?.nokRelationship || "Not Available"}
                  isLoading={isLoading}
                />
              </Box>
            </>
          )}
        </Stack>
      </div>

      <div>
        <Typography sx={{ color: "#099250" }} fontWeight={500} fontSize={18}>
          Health Plan
        </Typography>
        <Stack
          sx={{
            display: "flex",
          }}
        >
          <TextLabel
            label="HMO Plan"
            text={client?.HMOPlan}
            isLoading={isLoading}
          />
          <TextLabel
            label="Nominated Pharmacy"
            text={client?.nominatedPharmarcy || "None"}
            isLoading={isLoading}
          />
          <TextLabel
            label="Registered Doctor"
            text={client?.registeredDoctor || "None"}
            isLoading={isLoading}
          />
        </Stack>
      </div>

      {showEdit && (
        <>
          <Dialog maxWidth={"xl"} open={showEdit}>
            <DialogTitle textAlign={"center"} p={2}>
              Edit Service User Details
            </DialogTitle>
            <AiOutlineClose
              style={{
                position: "absolute",
                right: 22,
                top: 18,
                fontSize: 32,
                cursor: "pointer",
              }}
              onClick={() => setShowEdit(false)}
            />
            <DialogContent>
              <div>
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
                  <div style={{ marginTop: 8 }}>
                    <PhoneField
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={(value: any) =>
                        handleChange("phoneNumber", value)
                      }
                    />
                  </div>

                  <InputField
                    type="text"
                    label="Address"
                    name="address"
                    value={editForm.address}
                    onChange={(e: any) =>
                      handleChange("address", e.target.value)
                    }
                  />

                  <label htmlFor="state" style={{ marginTop: 8 }}>
                    State
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="state"
                      defaultValue={editForm.state}
                      onChange={(e: any) =>
                        handleChange("state", e.target.value)
                      }
                    >
                      {StatesData.map((state, index) => (
                        <MenuItem key={index} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>

                  <label htmlFor="LGA" style={{ marginTop: 8 }}>
                    L.G.A
                    <TextField
                      select
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="lga"
                      value={editForm.lga}
                      onChange={(e: any) => handleChange("lga", e.target.value)}
                    >
                      {StatesData?.find(
                        (state) => state.name === editForm.state
                      )?.lgas.map((lga, index) => (
                        <MenuItem key={index} value={lga}>
                          {lga ? lga : ""}
                        </MenuItem>
                      ))}
                    </TextField>
                  </label>

                  <label htmlFor="height" style={{ marginTop: 10 }}>
                    Height
                    <OutlinedInput
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="height"
                      value={editForm.height}
                      endAdornment={
                        <InputAdornment position="end">cm</InputAdornment>
                      }
                      inputProps={{
                        max: 999,
                        type: "number",
                        min: 0,
                      }}
                      onChange={(e: any) =>
                        handleChange("height", e.target.value)
                      }
                    />
                  </label>

                  <label style={{ marginTop: 10 }}>
                    Weight
                    <OutlinedInput
                      sx={{ marginTop: "5px" }}
                      fullWidth
                      name="weight"
                      value={editForm.weight}
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      inputProps={{
                        max: 999,
                        type: "number",
                        min: 0,
                      }}
                      onChange={(e: any) =>
                        handleChange("weight", e.target.value)
                      }
                    />
                  </label>
                </Box>
              </div>

              <div style={{ marginTop: 10 }}>
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1.5,
                    rowGap: 1.5,
                    marginTop: "8px",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      lg: "repeat(2, 1fr)",
                    },
                  }}
                >
                  <div className={Style.display}>
                    <InputField
                      type="text"
                      label="Parent One"
                      name="parentOne"
                      value={editForm.parentOne}
                      onChange={(e: any) =>
                        handleChange("parentOne", e.target.value)
                      }
                    />

                    <div style={{ marginTop: 8 }}>
                      <PhoneField
                        name="parentOneNumber"
                        value={editForm.parentOneNumber}
                        onChange={(value: any) =>
                          handleChange("parentOneNumber", value)
                        }
                      />
                    </div>

                    <InputField
                      type="text"
                      label="NHR ID"
                      name="parentOneNHR_ID"
                      value={editForm.parentOneNHRID}
                      onChange={(e: any) =>
                        handleChange("parentOneNHRID", e.target.value)
                      }
                    />

                    <label
                      htmlFor="parentOneRelationship"
                      style={{ marginTop: 10 }}
                    >
                      Relationship
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="parentOneRelationship"
                        value={editForm.parentOneRelationship}
                        onChange={(e: any) =>
                          handleChange("parentOneRelationship", e.target.value)
                        }
                      >
                        {relations.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  </div>

                  <div className={Style.display}>
                    <InputField
                      type="text"
                      label="Parent Two"
                      name="parentTwo"
                      value={editForm.parentTwo}
                      onChange={(e: any) =>
                        handleChange("parentTwo", e.target.value)
                      }
                    />
                    <div style={{ marginTop: 8 }}>
                      <PhoneField
                        name="parentTwoNumber"
                        value={editForm.parentTwoNumber}
                        onChange={(value: any) =>
                          handleChange("parentTwoNumber", value)
                        }
                      />
                    </div>

                    <InputField
                      type="text"
                      label="NHR ID"
                      name="parentTwoNHR_ID"
                      value={editForm.parentTwoNHRID}
                      onChange={(e: any) =>
                        handleChange("parentTwoNHRID", e.target.value)
                      }
                    />

                    <label
                      htmlFor="parentOneRelationship"
                      style={{ marginTop: 10 }}
                    >
                      Relationship
                      <TextField
                        select
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="parentTwoRelationship"
                        value={editForm.parentTwoRelationship}
                        onChange={(e: any) =>
                          handleChange("parentTwoRelationship", e.target.value)
                        }
                      >
                        {relations.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  </div>

                  <InputField
                    type="text"
                    label="HMO Name"
                    name="HMOPlan"
                    value={editForm.HMOPlan}
                    onChange={(value: any) => handleChange("HMOPlan", value)}
                  />

                  <InputField
                    type="text"
                    label="Nominated Pharmacy"
                    name="nominatedPharmarcy"
                    value={editForm.nominatedPharmarcy}
                    onChange={(e: any) =>
                      handleChange("nominatedPharmarcy", e.target.value)
                    }
                  />

                  <InputField
                    type="text"
                    label="Registered Doctor"
                    name="registeredDoctor"
                    value={editForm.registeredDoctor}
                    onChange={(e: any) =>
                      handleChange("registeredDoctor", e.target.value)
                    }
                  />
                </Box>
              </div>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
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
                onClick={updateUser}
                disabled={isLoad}
              >
                Save changes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
