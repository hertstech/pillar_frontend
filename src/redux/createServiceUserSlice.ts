import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // STEP ONE
  firstName: "",
  title: "",
  middleName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  religion: "",
  PhoneNumber: "",
  height: "",
  weight: "",
  address: "",
  state: "",
  lga: "",
  tribalMarks: "",
  parentOne: "",
  parentOneNumber: "",
  parentOneNHR_ID: "",
  parentOneRelationship: "",
  parentTwo: "",
  parentTwoNumber: "",
  parentTwoNHR_ID: "",
  parentTwoRelationship: "",
  nokFullName: "",
  nokNHR_ID: "",
  nokPhoneNumber: "",
  nokRelationship: "",
  nominatedPharmarcy: "",
  registeredDoctor: "",
  registeredHospital: "",
  HMOPlan: "",

  // STEP TWO
  NIN: "",
  driversLicense: "",
  passportNumber: "",
  day: "",
  month: "",
  year: "",
};

export const createServiceUserSlice = createSlice({
  name: "newUser",
  initialState,

  reducers: {
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    updateReligion: (state, action) => {
      state.religion = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.PhoneNumber = action.payload;
    },
    updateHeight: (state, action) => {
      state.height = action.payload;
    },
    updateWeight: (state, action) => {
      state.weight = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
    updateLGA: (state, action) => {
      state.lga = action.payload;
    },
    updateTribalMarks: (state, action) => {
      state.tribalMarks = action.payload;
    },
    updateParentOne: (state, action) => {
      state.parentOne = action.payload;
    },
    updateParentOneNumber: (state, action) => {
      state.parentOneNumber = action.payload;
    },
    updateParentOneID: (state, action) => {
      state.parentOneNHR_ID = action.payload;
    },
    updateParentOneRelationship: (state, action) => {
      state.parentOneRelationship = action.payload;
    },
    updateParentTwo: (state, action) => {
      state.parentTwo = action.payload;
    },
    updateParentTwoNumber: (state, action) => {
      state.parentTwoNumber = action.payload;
    },
    updateParentTwoID: (state, action) => {
      state.parentTwoNHR_ID = action.payload;
    },
    updateParentTwoRelationship: (state, action) => {
      state.parentTwoRelationship = action.payload;
    },
    updateNextOfKinName: (state, action) => {
      state.nokFullName = action.payload;
    },
    updateNextOfKinNumber: (state, action) => {
      state.nokPhoneNumber = action.payload;
    },
    updateNextOfKinID: (state, action) => {
      state.nokNHR_ID = action.payload;
    },
    updateNextOfKinRelationship: (state, action) => {
      state.nokRelationship = action.payload;
    },
    updateNominatedPharmacy: (state, action) => {
      state.nominatedPharmarcy = action.payload;
    },
    updateRegisteredDoctor: (state, action) => {
      state.registeredDoctor = action.payload;
    },
    updateRegisteredHospital: (state, action) => {
      state.registeredHospital = action.payload;
    },
    updateHMO: (state, action) => {
      state.HMOPlan = action.payload;
    },
    updateNIN: (state, action) => {
      state.NIN = action.payload;
    },
    updateDriversLicence: (state, action) => {
      state.driversLicense = action.payload;
    },
    updatePassportNumber: (state, action) => {
      state.passportNumber = action.payload;
    },
    updateDay: (state, action) => {
      state.day = action.payload;
    },
    updateMonth: (state, action) => {
      state.month = action.payload;
    },
    updateYear: (state, action) => {
      state.year = action.payload;
    },
    clearNewSlice: (state) => {
      state = initialState;
    },
  },
});

export const {
  updateFirstName,
  updateTitle,
  updateLastName,
  updateEmail,
  updateGender,
  updateDateOfBirth,
  updateReligion,
  updatePhoneNumber,
  updateHeight,
  updateWeight,
  updateAddress,
  updateState,
  updateLGA,
  updateTribalMarks,
  updateParentOne,
  updateParentOneNumber,
  updateParentOneRelationship,
  updateParentOneID,
  updateParentTwo,
  updateParentTwoNumber,
  updateParentTwoID,
  updateParentTwoRelationship,
  updateNextOfKinName,
  updateNextOfKinID,
  updateNextOfKinNumber,
  updateNextOfKinRelationship,
  updateNominatedPharmacy,
  updateRegisteredDoctor,
  updateRegisteredHospital,
  updateHMO,
  updateNIN,
  updateDriversLicence,
  updatePassportNumber,
  updateDay,
  updateMonth,
  updateYear,
  clearNewSlice,
} = createServiceUserSlice.actions;

export default createServiceUserSlice.reducer;
