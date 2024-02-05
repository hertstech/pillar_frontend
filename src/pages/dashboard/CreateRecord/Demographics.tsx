import React from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import InputField from "../../../components/InputField";
import PhoneField from "../../../components/PhoneInput";
import StatesData from "../../../../states.json";

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

export default function Demographics() {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const [editForm, setEditForm] = React.useState({
    phoneNumber: client?.phoneNumber || "",
    address: client?.address || "",
    state: client?.state || "",
    lga: client?.lga || "",
    height: client?.height || "",
    weight: client?.weight || "",
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

  const handleChange = (name: string, value: any) => {
    setEditForm({
      ...editForm,
      [name || ""]: value,
    });
  };

  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Create Service User
        </Typography>
      </div>

      <div>
        <Box
        // sx={{
        //   display: "grid",
        //   columnGap: 1.5,
        //   rowGap: 1.5,
        //   gridTemplateColumns: {
        //     xs: "repeat(1, 1fr)",
        //     lg: "repeat(3, 1fr)",
        //   },
        // }}
        >
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
              }}
              onChange={(e: any) => handleChange("height", e.target.value)}
            />
          </label>

          <label style={{ marginTop: 10 }}>
            Weight
            <OutlinedInput
              sx={{ marginTop: "5px", fontFamily: "fontNormal" }}
              fullWidth
              name="weight"
              value={editForm.weight}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              inputProps={{
                max: 999,
                type: "number",
                min: 0,
              }}
              onChange={(e: any) => handleChange("weight", e.target.value)}
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

          <Box sx={{mt:3}}>
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
        </Box>
      </div>
    </Box>
  );
}