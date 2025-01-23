import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import InputField from "../../../../components/InputField";
import PhoneField from "../../../../components/PhoneInput";
import StatesData from "../../../../../states.json";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Utils";
import { dispatchClient } from "../../../../redux/clientSlice";
import { relations } from "../../serviceUsers/shared";
import { useAlert } from "../../../../Utils/useAlert";

export default function Profile() {
  const client = useSelector((state: any) => state.client.clients.tab1[0]);

  const user = useSelector((state: any) => state.user.user);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [editForm, setEditForm] = React.useState({
    firstName: client?.firstName,
    middleName: client?.middleName,
    lastName: client?.lastName,
    gender: client?.gender,
    religion: client?.religion,
    dateOfBirth: client?.dateOfBirth,
    tribalMarks: client?.tribalMarks,
    phoneNumber: client?.phoneNumber || "",
    email: client?.email,
    id: id,
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

  const handleChange = (name: string, value: any) => {
    setEditForm({
      ...editForm,
      [name]:
        name === "height" || name === "weight" ? parseFloat(value) : value,
    });
  };

  const [isLoad, setIsLoad] = React.useState(false);

  const updateUser = async (e: any) => {
    e.preventDefault();
    setIsLoad(true);

    try {
      const res = await axiosInstance.patch(
        `/update-serviceiuser-profile/${id}`,
        editForm
      );

      const responseArray = [res.data];

      dispatch(dispatchClient({ tabId: "tab1", client: responseArray }));

      setIsLoad(false);
      useAlert({
        isToast: true,
        icon: "success",
        position: "top-start",
        title: "Record Successfully Updated",
      });

      // console.log(res.data);
      if (user.role === "superadmin" || user.role === "admin") {
        navigate(`/dashboard/user/${id}?tabId=1`);
      } else {
        navigate(`/dashboard/user/${id}`);
      }
    } catch (error) {
      setIsLoad(false);
      useAlert({
        isToast: true,
        icon: "error",
        position: "top-start",
        title: "Something went wrong try again shortly",
      });
    }
  };

  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Update Profile
        </Typography>
      </div>

      <form onSubmit={updateUser}>
        <div>
          <Box>
            <Typography
              sx={{ color: "#090816" }}
              fontWeight={600}
              fontSize={20}
            >
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
                endAdornment={
                  <InputAdornment position="end">cm</InputAdornment>
                }
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
                Care team Information
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
          disabled={isLoad}
          variant="contained"
          sx={{ width: "100%", color: "white", marginTop: 4 }}
        >
          Update Profile
        </Button>
      </form>
    </Box>
  );
}
