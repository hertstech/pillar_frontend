import {
  Box,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";

import InputField from "../../../../components/InputField";
import PhoneField from "../../../../components/PhoneInput";
import StatesData from "../../../../../states.json";
import { relations } from "../../serviceUsers/shared";
import moment from "moment";
import { useSelector } from "react-redux";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../../../Utils/useAlert";

export const ProfileForm = forwardRef(({ onSubmit }: any, ref) => {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);
  const { id } = useParams();

  const [editForm, setEditForm] = React.useState({
    firstName: client?.firstName,
    middleName: client?.middleName,
    lastName: client?.lastName,
    gender: client?.gender,
    religion: client?.religion,
    dateOfBirth: client?.dateOfBirth,
    tribalMarks: client?.tribalMarks,
    email: client?.email,
    id: id,
    phoneNumber: client?.phoneNumber || "",
    address: client?.address || "",
    state: client?.state || "",
    lga: client?.lga || "",
    height: client?.height ? parseFloat(client.height) : 0,
    weight: client?.weight ? parseFloat(client.weight) : 0,
    parentOne: client?.parentOne || "",
    parentOneNumber: client?.parentOneNumber || "",
    parentOneNHR_ID: client?.parentOneNHR_ID || "",
    parentOneRelationship: client?.parentOneRelationship || "",
    parentTwo: client?.parentTwo || "",
    parentTwoNumber: client?.parentTwoNumber || "",
    parentTwoNHR_ID: client?.parentTwoNHR_ID || "",
    parentTwoRelationship: client?.parentTwoRelationship || "",
    nokFullName: client?.nokFullName || "",
    nokPhoneNumber: client?.nokPhoneNumber || "",
    nokNHR_ID: client?.nokNHR_ID || "",
    nokRelationship: client?.nokRelationship || "",
    HMOPlan: client?.HMOPlan || "",
    nominatedPharmarcy: client?.nominatedPharmarcy || "",
    registeredDoctor: client?.registeredDoctor || "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (name: string, value: any) => {
    setEditForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (!isDirty) {
        useAlert({
          position: "top-start",
          icon: "warning",
          title: "No Changes Detected",
          text: "Please update the profile before proceeding.",
        });
        return;
      }
      onSubmit(editForm);
    },
  }));

  const submitForm = () => {
    onSubmit(editForm);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Box>
          <Typography sx={{ color: "#090816" }} fontWeight={600} fontSize={20}>
            Contact Details
          </Typography>

          <div style={{ marginTop: 8 }}>
            <PhoneField
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={(value: any) => handleChange("phoneNumber", value)}
            />
          </div>

          <InputField
            type="text"
            label="Address"
            name="address"
            value={editForm.address}
            onChange={(e: any) => handleChange("address", e.target.value)}
          />

          <label htmlFor="state" style={{ marginTop: 8 }}>
            State
            <TextField
              select
              sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
              fullWidth
              name="state"
              defaultValue={editForm.state}
              onChange={(e: any) => handleChange("state", e.target.value)}
            >
              {StatesData.map((state, index) => (
                <MenuItem
                  sx={{ fontFamily: "fontNormal" }}
                  key={index}
                  value={state.name}
                >
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="LGA" style={{ marginTop: 8 }}>
            L.G.A
            <TextField
              select
              sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
              fullWidth
              name="lga"
              value={editForm.lga}
              onChange={(e: any) => handleChange("lga", e.target.value)}
            >
              {StatesData?.find(
                (state) => state.name === editForm.state
              )?.lgas.map((lga, index) => (
                <MenuItem
                  sx={{ fontFamily: "fontNormal" }}
                  key={index}
                  value={lga}
                >
                  {lga ? lga : ""}
                </MenuItem>
              ))}
            </TextField>
          </label>

          <label htmlFor="height" style={{ marginTop: 10 }}>
            Height
            <OutlinedInput
              sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
              fullWidth
              name="height"
              value={editForm.height}
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              inputProps={{
                max: 999,
                type: "number",
                min: 0,
                step: 0,
              }}
              onChange={(e: any) => handleChange("height", e.target.value)}
              onWheel={(e: any) => e.target.blur()}
            />
          </label>

          <label style={{ marginTop: 10 }}>
            Weight
            <TextField
              type="number"
              sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
              fullWidth
              name="weight"
              value={editForm.weight}
              inputProps={{
                max: 999,
                type: "number",
                min: 0,
                step: 0,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              onChange={(e: any) => handleChange("weight", e.target.value)}
              onWheel={(e: any) => e.target.blur()}
            />
          </label>
        </Box>
      </div>

      <div style={{ marginTop: 16 }}>
        <Typography sx={{ color: "#090816" }} fontWeight={600} fontSize={20}>
          Emergency Contact
        </Typography>

        <Box>
          {/* PARENT ONE EDIT SECTION */}
          {moment(new Date()).diff(client?.dateOfBirth, "years") < 18 && (
            <>
              <Typography
                sx={{
                  mt: "15px",
                  fontWeight: "fontBold ",
                }}
                fontWeight="fontBold"
                fontSize={16}
                color={"#101928"}
              >
                Legal Guardian One
              </Typography>
              <div>
                <InputField
                  type="text"
                  label="Full Name"
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
                  name="parentOneNHRID"
                  value={editForm.parentOneNHR_ID}
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
                      <MenuItem
                        sx={{ fontFamily: "fontNormal" }}
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              </div>
            </>
          )}

          {/* PARENT TWO EDIT SECTION */}
          {moment(new Date()).diff(client?.dateOfBirth, "years") < 18 && (
            <>
              <Typography
                sx={{
                  mt: "15px",
                  fontWeight: "fontBold ",
                }}
                fontWeight="fontBold"
                fontSize={16}
                color={"#101928"}
              >
                Legal Guardian Two
              </Typography>
              <div>
                <InputField
                  type="text"
                  label="Full Name"
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
                  name="parentTwoNHRID"
                  value={editForm.parentTwoNHR_ID}
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
                    sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
                    fullWidth
                    name="parentTwoRelationship"
                    value={editForm.parentTwoRelationship}
                    onChange={(e: any) =>
                      handleChange("parentTwoRelationship", e.target.value)
                    }
                  >
                    {relations.map((item, index) => (
                      <MenuItem
                        sx={{ fontFamily: "fontNormal" }}
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              </div>
            </>
          )}

          {/* NEXT OF KIN EDIT SECTION */}
          {moment(new Date()).diff(client?.dateOfBirth, "years") >= 18 && (
            <>
              <Typography
                sx={{
                  mt: "10px",
                  fontWeight: "fontBold ",
                }}
                fontWeight="fontBold"
                fontSize={16}
                color={"#101928"}
              >
                Next Of Kin
              </Typography>
              <div>
                <InputField
                  type="text"
                  label="Full Name"
                  name="nokFullName"
                  value={editForm.nokFullName}
                  onChange={(e: any) =>
                    handleChange("nokFullName", e.target.value)
                  }
                />
                <div style={{ marginTop: 8 }}>
                  <PhoneField
                    name="nokPhoneNumber"
                    value={editForm.nokPhoneNumber}
                    onChange={(value: any) =>
                      handleChange("nokPhoneNumber", value)
                    }
                  />
                </div>

                <InputField
                  type="text"
                  label="NHR ID"
                  name="nokNHR_ID"
                  value={editForm.nokNHR_ID}
                  onChange={(e: any) =>
                    handleChange("nokNHR_ID", e.target.value)
                  }
                />

                <label htmlFor="nokRelationship" style={{ marginTop: 10 }}>
                  Relationship
                  <TextField
                    select
                    sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
                    fullWidth
                    name="nokRelationship"
                    value={editForm.nokRelationship}
                    onChange={(e: any) =>
                      handleChange("nokRelationship", e.target.value)
                    }
                  >
                    {relations.map((item, index) => (
                      <MenuItem
                        sx={{ fontFamily: "fontNormal" }}
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>
              </div>
            </>
          )}

          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{ color: "#090816" }}
              fontWeight={600}
              fontSize={20}
            >
              Health Plan Information
            </Typography>
            <InputField
              type="text"
              label="HMO Name"
              name="HMOPlan"
              value={editForm.HMOPlan}
              onChange={(e: any) => handleChange("HMOPlan", e.target.value)}
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
        </Box>
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 6 }}
      >
        Continue
      </Button>
      {/* <Stack marginTop={5}>
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  outline: "none",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  background: "#2E90FA",
                  height: "48px",
                  "&:hover": { backgroundColor: "#2E90FA" },
                  borderRadius: 2,
                }}
                onClick={updateUser}
                disabled={isLoad}
              >
                Save changes
              </Button>
            </Stack> */}
    </form>
  );
});
