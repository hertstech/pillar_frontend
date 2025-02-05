export interface FormState {
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
export interface apiResponse {
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
export interface client {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  bmi?: number;
  lga: string;
  date_created?: Date| string;
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

export type DiagnosisType =
  | "cancer"
  | "type_2_diabetes_mellitus"
  | "asthma"
  | "migraine_headaches"
  | "hypertension"
  | "default";
