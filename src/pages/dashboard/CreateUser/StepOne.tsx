import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputField from "../../../components/InputField";
import StatesData from "../../../../states.json";
import PhoneField from "../../../components/PhoneInput";
import moment from "moment";
import { relations, titles } from "../serviceUsers/shared";
import { GoPlusCircle } from "react-icons/go";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { stepOneSchema } from "./schema/StepOne";
import Buttons from "../../../components/Button";
import { useGetHCPInfo } from "../../../api/hcp";
import { IoMdStar } from "react-icons/io";

export default function StepOne({
  formData,
  handleNext,
  handleChange: superHandleChange,
}: any) {
  const [show, setShow] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const { data } = useGetHCPInfo();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(stepOneSchema),
    defaultValues: formData,
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    const { name, value } = event.target;
    superHandleChange({ ...formData, [name || ""]: value });
    setSelectedDoctor(value);
    setValue(name || "", value, { shouldValidate: true });
  };

  const handleDateChange = (newValue: any) => {
    setValue("dateOfBirth", newValue ? newValue.format("YYYY-MM-DD") : "", {
      shouldValidate: true,
    });
    superHandleChange({
      ...formData,
      dateOfBirth: newValue ? newValue.format("YYYY-MM-DD") : "",
    });
  };

  const handlePhoneChange = (value: any, identifier: any) => {
    setValue(identifier, value, { shouldValidate: true });
    superHandleChange({ ...formData, [identifier]: value });
  };

  const onSubmit = (data: any) => {
    superHandleChange(data);
    handleNext();
  };

  useEffect(() => {
    if (data?.data) {
      const hcpData = data.data;
      setValue("facilityName", hcpData?.name || "");
      setValue("facilityType", hcpData?.type || "");
      setValue("facilityOwnership", hcpData?.ownership || "");
      setValue("facilityDoor", hcpData?.house_number || "");
      setValue("facilityStreet", hcpData?.street_name || "");
      setValue("facilityTown", hcpData?.town || "");
      setValue("facilityLGA", hcpData?.lga || "");
      setValue("facilityState", hcpData?.state || "");
      setValue("facilityPhone1", hcpData?.facility_phone_number_1 || "");
      setValue("facilityPhone2", hcpData?.facility_phone_number_1 || "");

      if (hcpData?.management?.length > 0) {
        const manager = hcpData.management[0];
        setValue(
          "registeredDoctor",
          `${manager.title} ${manager.firstName} ${manager.lastName}`
        );
      }
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* PERSONAL INFORMATION */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <label htmlFor="title" style={{ marginTop: 9 }}>
            <span className="flex items-center gap-1">
              Title <IoMdStar size={10} className="text-err" />
            </span>

            <TextField
              {...register("title")}
              select
              error={!!errors.title}
              value={formData.title}
              sx={{ marginTop: "5px", width: "110px" }}
              fullWidth
              name="title"
              placeholder="Mr"
              onChange={handleChange}
            >
              {titles.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            {!!errors.title && (
              <p className="text-err text-xs !font-semibold">
                Title is required.
              </p>
            )}
          </label>

          <InputField
            showRequired
            type="text"
            label="First Name"
            name="firstName"
            placeholder="Pascal"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
        </div>

        <InputField
          type="text"
          label="Middle Name"
          name="middleName"
          onChange={handleChange}
          placeholder="Nike"
          register={register}
          errors={errors}
        />

        <InputField
          showRequired
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Wike"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <InputField
          showRequired
          type="email"
          label="Email Address"
          name="email"
          placeholder="mememe@allmail.com"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <label htmlFor="gender">
          <span className="flex items-center gap-1">
            Gender
            <IoMdStar size={10} className="text-err" />
          </span>
          <TextField
            select
            {...register("gender")}
            error={!!errors.gender}
            sx={{ marginTop: "5px" }}
            fullWidth
            name="gender"
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          {!!errors?.gender && (
            <p className="text-err text-xs !font-semibold">
              {"Gender field is required"}
            </p>
          )}
        </label>

        <label htmlFor="dateOfBirth">
          <span className="flex items-center gap-1">
            Date of Birth
            <IoMdStar size={10} className="text-err" />
          </span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                orientation="portrait"
                views={["year", "month", "day"]}
                format="DD/MM/YYYY"
                sx={{ marginTop: "5px", width: "100%" }}
                disableFuture={true}
                slotProps={{
                  field: {
                    readOnly: true,
                  },
                }}
                value={
                  formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null
                }
                onChange={(newValue) => {
                  handleDateChange(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {!!errors?.dateOfBirth && (
            <p className="text-err text-xs !font-semibold">
              {/* @ts-ignore */}
              {errors.dateOfBirth?.message ||
                "Please enter your Date of Birth."}
            </p>
          )}
        </label>

        <label htmlFor="religion">
          <span className="flex items-center gap-1">
            Religion
            <IoMdStar size={10} className="text-err" />
          </span>
          <TextField
            select
            {...register("religion")}
            error={!!errors.religion}
            sx={{ marginTop: "5px" }}
            fullWidth
            name="religion"
            onChange={handleChange}
          >
            <MenuItem value="christian">Christian</MenuItem>
            <MenuItem value="muslim">Muslim</MenuItem>
            <MenuItem value="traditional">Traditional</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>
          {!!errors?.religion && (
            <p className="text-err text-xs !font-semibold">
              {"Religion must be selected"}
            </p>
          )}
        </label>

        <PhoneField
          {...register("phoneNumber")}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(value: any) => handlePhoneChange(value, "phoneNumber")}
        />

        <label htmlFor="height">
          <span className="flex items-center gap-1">
            Height
            <IoMdStar size={10} className="text-err" />
          </span>
          <OutlinedInput
            type="number"
            {...register("height")}
            sx={{ marginTop: "5px" }}
            fullWidth
            name="height"
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            inputProps={{
              max: 999,

              type: "number",
              min: 0,
            }}
            onChange={handleChange}
          />
          {!!errors?.religion && (
            <p className="text-err text-xs !font-semibold">
              {"This field is required"}
            </p>
          )}
        </label>

        <label>
          <span className="flex items-center gap-1">
            Weight
            <IoMdStar size={10} className="text-err" />
          </span>
          <OutlinedInput
            type="number"
            {...register("weight")}
            sx={{ marginTop: "5px" }}
            fullWidth
            name="weight"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            inputProps={{
              max: 999,
              type: "number",
              min: 0,
            }}
            onChange={handleChange}
          />
          {!!errors?.weight && (
            <p className="text-err text-xs !font-semibold">
              {"This field is required"}
            </p>
          )}
        </label>

        <label htmlFor="tribalMarks">
          Tribal Mark
          <TextField
            select
            {...register("tribalMarks")}
            error={!!errors.tribalMarks}
            fullWidth
            name="tribalMarks"
            sx={{ marginTop: "5px" }}
            value={formData.tribalMarks}
            onChange={handleChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          {!!errors.tribalMarks && (
            <p className="text-err text-xs !font-semibold">
              tribalMarks field is required.
            </p>
          )}
        </label>
      </Box>

      {/* RESIDENTIAL DETAILS */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Residential Information</Typography>
        <InputField
          showRequired
          type="text"
          label="Address"
          name="address"
          register={register}
          errors={errors}
          onChange={handleChange}
        />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            marginTop: 1,
          }}
        >
          <label htmlFor="state">
            <span className="flex items-center gap-1">
              State
              <IoMdStar size={10} className="text-err" />
            </span>
            <TextField
              select
              sx={{ marginTop: "5px" }}
              fullWidth
              {...register("state")}
              error={!!errors.state}
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              {StatesData.map((state, index) => (
                <MenuItem key={index} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
            {!!errors.state && (
              <p className="text-err text-xs !font-semibold">
                State is required.
              </p>
            )}
          </label>

          <label htmlFor="LGA">
            <span className="flex items-center gap-1">
              L.G.A
              <IoMdStar size={10} className="text-err" />
            </span>
            <TextField
              select
              {...register("lga")}
              error={!!errors.lga}
              sx={{ marginTop: "5px" }}
              fullWidth
              name="lga"
              value={formData.lga}
              onChange={handleChange}
            >
              {StatesData?.find(
                (state) => state.name === formData.state
              )?.lgas.map((lga, index) => (
                <MenuItem key={index} value={lga}>
                  {lga ? lga : ""}
                </MenuItem>
              ))}
            </TextField>
            {!!errors.lga && (
              <p className="text-err text-xs !font-semibold">
                Local government is required.
              </p>
            )}
          </label>
        </Box>
      </Box>

      {moment(new Date()).diff(formData.dateOfBirth, "years") < 18 ? (
        // {/* PARENT INFORMATION */}
        <Box sx={{ marginBottom: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Legal Guardian</Typography>
            <button
              title="Add new parent"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => setShow(true)}
            >
              <GoPlusCircle />
            </button>
          </Stack>
          <InputField
            type="text"
            label="Legal Guardian 1"
            name="parentOne"
            onChange={handleChange}
            register={register}
            errors={errors}
            placeholder="Please enter full name"
          />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <InputField
              type="number"
              label="NHR ID"
              name="parentOneNHR_ID"
              onChange={handleChange}
              register={register}
              errors={errors}
              placeholder="Enter NHR ID number"
            />

            <div style={{ marginTop: 8 }}>
              <PhoneField
                isRequired={true}
                {...register("parentOneNumber")}
                name="parentOneNumber"
                value={formData.parentOneNumber}
                onChange={(value: any) =>
                  handlePhoneChange(value, "parentOneNumber")
                }
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <label htmlFor="parentOneRelationship">
                Relationship
                <TextField
                  select
                  {...register("parentOneRelationship")}
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="parentOneRelationship"
                  value={formData.parentOneRelationship}
                  onChange={handleChange}
                >
                  {relations.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            </div>
          </Box>
          {show && (
            <>
              <Box>
                <InputField
                  type="text"
                  label="Legal Guardian 2"
                  name="parentTwo"
                  value={formData.parentTwo}
                  onChange={handleChange}
                  register={register}
                  errors={errors}
                  placeholder="Please enter full name"
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: "column",
                    marginBottom: 2,
                  }}
                >
                  <InputField
                    type="number"
                    label="NHR ID"
                    name="parentTwoNHR_ID"
                    value={formData.parentTwoNHR_ID}
                    onChange={handleChange}
                    register={register}
                    errors={errors}
                  />

                  <div style={{ marginTop: 8 }}>
                    <PhoneField
                      {...register("parentTwoNumber")}
                      name="parentTwoNumber"
                      value={formData.parentTwoNumber}
                      onChange={(value: any) =>
                        handlePhoneChange(value, "parentTwoNumber")
                      }
                    />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <label htmlFor="parentTwoRelationship">
                      Relationship
                      <TextField
                        select
                        {...register("parentTwoRelationship")}
                        sx={{ marginTop: "5px" }}
                        fullWidth
                        name="parentTwoRelationship"
                        value={formData.parentTwoRelationship}
                        onChange={handleChange}
                      >
                        {relations.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </label>
                  </div>
                </Box>
              </Box>
            </>
          )}
        </Box>
      ) : (
        //  {/* FAMILY/RELATIVE INFORMATION */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Next of Kin</Typography>
          <InputField
            type="text"
            label="Full Name"
            name="nokFullName"
            onChange={handleChange}
            register={register}
            errors={errors}
            placeholder="Please enter full name"
          />

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <InputField
              type="number"
              label="NHR ID"
              name="nokNHR_ID"
              onChange={handleChange}
              register={register}
              errors={errors}
              placeholder="Enter NHR ID number"
            />

            <div style={{ marginTop: 8 }}>
              <PhoneField
                {...register("nokPhoneNumber")}
                name="nokPhoneNumber"
                value={formData.nokPhoneNumber}
                onChange={(value: any) =>
                  handlePhoneChange(value, "nokPhoneNumber")
                }
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <label htmlFor="nokRelationship">
                Relationship
                <TextField
                  select
                  {...register("nokRelationship")}
                  sx={{ marginTop: "5px" }}
                  fullWidth
                  name="nokRelationship"
                  value={formData.nokRelationship}
                  onChange={handleChange}
                >
                  {relations.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>
            </div>
          </Box>
        </Box>
      )}

      {/* MEDICAL INFORMATION */}

      <Box>
        <Typography variant="h6">Care Team Information</Typography>

        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility Name"
          name="facilityName"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility Door No."
          name="facilityDoor"
          onChange={handleChange}
          register={register}
          errors={errors}
          className="!capitalize"
        />

        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility Street"
          name="facilityStreet"
          onChange={handleChange}
          register={register}
          errors={errors}
          className="!capitalize"
        />

        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility Town(City)"
          name="facilityTown"
          onChange={handleChange}
          register={register}
          errors={errors}
          className="!capitalize"
        />
        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility LGA"
          name="facilityLGA"
          onChange={handleChange}
          register={register}
          errors={errors}
          className="!capitalize"
        />
        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility State"
          name="facilityState"
          onChange={handleChange}
          register={register}
          errors={errors}
          className="!capitalize"
        />

        <InputField
          showRequired
          type="text"
          isReadOnly
          label="Facility Phone 1"
          name="facilityPhone1"
          placeholder="First Facility's phone number"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <InputField
          type="text"
          isReadOnly
          label="Facility Phone 2"
          name="facilityPhone2"
          placeholder="Second Facility's phone number"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <div style={{ marginTop: 8 }}>
          <label htmlFor="facilityType">
            Facility Type
            <TextField
              select
              {...register("facilityType")}
              sx={{ marginTop: "5px" }}
              fullWidth
              name="facilityType"
              value={data?.data?.ownership || ""}
              onChange={handleChange}
              inputProps={{ readOnly: true }}
              className="!capitalize"
            >
              <MenuItem value={data?.data?.type}>{data?.data?.type}</MenuItem>
            </TextField>
          </label>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <label htmlFor="facilityOwnership">
            Facility Ownership
            <TextField
              select
              {...register("facilityOwnership")}
              sx={{ marginTop: "5px" }}
              fullWidth
              name="facilityOwnership"
              value={data?.data?.ownership || ""}
              onChange={handleChange}
              className="!capitalize"
            >
              <MenuItem value={data?.data?.ownership}>
                {data?.data?.ownership}
              </MenuItem>
            </TextField>
          </label>

          <label htmlFor="registeredDoctor">
            Registered Doctor
            <TextField
              select
              {...register("registeredDoctor")}
              sx={{ marginTop: "5px" }}
              fullWidth
              name="registeredDoctor"
              value={selectedDoctor || ""}
              onChange={handleChange}
              className="!capitalize"
            >
              {data?.data?.management.map((doctor: any) => (
                <MenuItem
                  key={doctor.id}
                  value={doctor.id}
                  className="!capitalize"
                >
                  {`${doctor.title} ${doctor.firstName} ${doctor.lastName} - ${doctor.position}`}
                </MenuItem>
              ))}
            </TextField>
          </label>
        </div>

        <InputField
          type="number"
          label="Doctor's License"
          placeholder="Enter Doctor's license number"
          name="doctorsLicense"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <InputField
          type="text"
          label="Nominated Pharmacy"
          name="nominatedPharmacy"
          placeholder="Enter Nominated Pharmacy's Name"
          onChange={handleChange}
          register={register}
          errors={errors}
          maxLength={50}
        />

        <InputField
          type="text"
          label="Nominated Pharmacy Door No."
          name="nominatedPharmacyDoor"
          placeholder="Enter Nominated Pharmacy's Door/House Number"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <InputField
          type="text"
          label="Nominated Pharmacy Street"
          name="nominatedPharmacyStreet"
          placeholder="Enter Nominated Pharmacy's Street"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <InputField
          type="text"
          label="Nominated Pharmacy Town(City)"
          name="nominatedPharmacyTown"
          placeholder="Enter Nominated Pharmacy's Town"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <InputField
          type="text"
          label="Nominated Pharmacy LGA"
          name="nominatedPharmacyLGA"
          placeholder="Enter Nominated Pharmacy's LGA"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <InputField
          type="text"
          label="Nominated Pharmacy State"
          name="nominatedPharmacyState"
          onChange={handleChange}
          placeholder="Enter Nominated Pharmacy's State"
          register={register}
          errors={errors}
        />

        <InputField
          type="text"
          label="HMO Plan"
          name="HMOPlan"
          placeholder="Enter current HMO plan"
          onChange={handleChange}
          register={register}
          errors={errors}
          maxLength={20}
        />

        <InputField
          type="number"
          label="HMO Number"
          name="HMONumber"
          placeholder="Enter HMO number"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
      </Box>

      <Buttons
        className="!flex justify-self-end !absolute bottom-6 right-24 2xl:right-36 !w-1/3"
        type="submit"
        title={"Next"}
      />
    </form>
  );
}
