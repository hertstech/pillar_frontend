
export const medName = [
  { label: "Amoxicillin", value: "Amoxicillin" },
  { label: "Cinnarizine", value: "Cinnarizine" },
  { label: "Felodipine", value: "Felodipine" },
  { label: "Fentanyl", value: "Fentanyl" },
  { label: "Memantine", value: "Memantine" },
  { label: "Metformin", value: "Metformin" },
  { label: "Oxybutynin", value: "Oxybutynin" },
  { label: "Paroxetine", value: "Paroxetine" },
];

export const medType = [
  { label: "New prescription", value: "New prescription" },
  { label: "Repeat prescription", value: "Repeat prescription" },
  { label: "Over the counter", value: "Over the counter" },
];

export const medRoute = [
  { label: "Oral", value: "Oral" },
  { label: "Inhale", value: "Inhale" },
  { label: "Vaccine", value: "Vaccine" },
  { label: "Injectable", value: "Injectable" },
  { label: "Topical", value: "Topical" },
];

export const medDosageForm = [
  { label: "Tablet", value: "Tablet" },
  { label: "Capsule", value: "Capsule" },
  { label: "Liquid", value: "Liquid" },
];

export const medDosage = [
  { label: "Ml", value: "Ml" },
  { label: "Mg", value: "Mg" },
  { label: "gtt", value: "gtt" },
  { label: "Ml", value: "Ml" },
];

export const medFrequency = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Fortnight", value: "Fortnight" },
];

export const substance = [
  { label: "Paracetamol", value: "Paracetamol" },
  { label: "Antibiotics", value: "Antibiotics" },
  { label: "Dust", value: "Dust" },
  { label: "Palm Oil", value: "Palm Oil" },
  { label: "Pepper", value: "Pepper" },
  { label: "Vegetable Oil", value: "Vegetable Oil" },
  { label: "Tramadol", value: "Tramadol" },
];

export const reactionType = [
  { label: "Intolerance", value: "Intolerance" },
  { label: "Allergy", value: "Allergy" },
];

export const reaction = [
  { value: "Sneezing", label: "Sneezing" },
  { value: "Shortness of breath", label: "Shortness of breath" },
  { value: "Cough", label: "Cough" },
  { value: "Dizziness", label: "Dizziness" },
  { value: "Death", label: "Death" },
  { value: "Skin irrtation", label: "Skin irrtation" },
  { value: "Vomitting", label: "Vomitting" },
  { value: "Unknown", label: "Unknown" },
];



export const severity = {
  Cancer: [
    { value: "Stage I", label: "Stage I" },
    { value: "Stage II", label: "Stage II" },
    { value: "Stage III", label: "Stage III" },
    { value: "Stage IV", label: "Stage IV" },
    { value: "Stage V", label: "Stage V" },
  ],
  Diabetes: [
    { value: "Mild", label: "Mild" },
    { value: "Moderate", label: "Moderate" },
    { value: "Severe", label: "Severe" },
    { value: "Critical", label: "Critical" },
    { value: "End-Stage", label: "End-Stage" },
  ],
  Asthma: [
    { value: "Intermittent", label: "Intermittent" },
    { value: "Mild", label: "Mild" },
    { value: "Moderate", label: "Moderate" },
    { value: "Severe", label: "Severe" },
    { value: "Uncontrolled", label: "Uncontrolled" },
  ],
  Migraine: [
    { value: "Prodrome", label: "Prodrome" },
    { value: "Aura", label: "Aura" },
    { value: "Headache", label: "Headache" },
    { value: "Postdrome", label: "Postdrome" },
    { value: "Status Migrainosus", label: "Status Migrainosus" },
  ],
  Hypertension: [
    { value: "Normal blood pressure", label: "Normal blood pressure" },
    { value: "Elevated blood pressure", label: "Elevated blood pressure" },
    { value: "Hypertension Stage 1", label: "Hypertension Stage 1" },
    { value: "Hypertension Stage 2", label: "Hypertension Stage 2" },
    { value: "Hypertensive Crisis", label: "Hypertensive Crisis" },
    {
      value: "Isolated Systolic Hypertension",
      label: "Isolated Systolic Hypertension",
    },
  ],
  default: [
    { value: "Mild", label: "Mild" },
    { value: "Moderate", label: "Moderate" },
    { value: "Severe", label: "Severe" },
    { value: "Life-threatening", label: "Life-threatening" },
    { value: "Fatal", label: "Fatal" },
    { value: "Chronic", label: "Chronic" },
    { value: "Acute", label: "Acute" },
    { value: "Critical", label: "Critical" },
    { value: "Stable", label: "Stable" },
    { value: "Progressive", label: "Progressive" },
  ],
};

export const certainty = [
  { value: "Speculated", label: "Speculated" },
  { value: "Suspected", label: "Suspected" },
  { value: "Suggested", label: "Suggested" },
  { value: "Likely", label: "Likely" },
  { value: "Certain", label: "Certain" },
];

export const reportedBy = [
  { label: "Relative", value: "Relative" },
  { label: "Client", value: "Client" },
  { label: "HCP", value: "HCP" },
  {
    label: "Other (pls specify in comment box)",
    value: "Other (pls specify in comment box)",
  },
];

export const category = [
  {
    name: "Vitals",
    type: [
      "Blood pressure",
      "Body Temperature",
      "Pulse Rate",
      "Respiration Rate",
      "Oxygen Saturation",
      "Blood group",
    ],
  },
];

export const bloodGroups = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "Other", label: "Other" },
];

export const primaryDiagnosis = [
  { value: "pneumonia", label: "Pneumonia" },
  { value: "type_2_diabetes_mellitus", label: "Type 2 Diabetes Mellitus" },
  { value: "hypertension", label: "Hypertension" },
  { value: "asthma", label: "Asthma" },
  { value: "coronary_artery_disease", label: "Coronary Artery Disease" },
  { value: "depression", label: "Depression" },
  { value: "osteoarthritis", label: "Osteoarthritis" },
  { value: "urinary_tract_infection", label: "Urinary Tract Infection (UTI)" },
  { value: "migraine_headaches", label: "Migraine Headaches" },
  {
    value: "gastroesophageal_reflux_disease",
    label: "Gastroesophageal Reflux Disease (GERD)",
  },
  { value: "cancer", label: "Cancer" },
];

export const secondaryDiagnosis = [
  { value: "respiratory_failure", label: "Respiratory Failure" },
  { value: "hypoxemia", label: "Hypoxemia" },
  { value: "sepsis", label: "Sepsis" },
  { value: "peripheral_neuropathy", label: "Peripheral Neuropathy" },
  { value: "hypertension", label: "Hypertension" },
  { value: "retinopathy", label: "Retinopathy" },
  { value: "cardiogenic_shock", label: "Cardiogenic Shock" },
  { value: "arrhythmia", label: "Arrhythmia" },
  { value: "coronary_artery_disease", label: "Coronary Artery Disease" },
];


export const treatmentStatus = [
  "Pending",
  "Active",
  // "Completed",
  // "On Hold",
  // "Cancelled",
  // "Suspended",
];

export const treatmentType = [
  "Other",
  "Medication",
  "Surgery",
  "Physical therapy",
  "Occupational therapy",
  "Radiation therapy",
  "Chemotherapy",
  "CBT",
  "Alternative therapy",
  "Immunotherapy",
  "Dialysis",
  "Transplantation",
  "Electroconvulsive Therapy",
  "Hormone Therapy",
  "Palliative care",
  "Respiratory Therapy",
  "Referred",
];

export const followUpPlans = [
  "Other",
  "Regular check ups",
  "Further diagnostic tests",
  "Medication review",
  "Specialist Referral",
  "Physical therapy sessions",
  "Dietary of lifestyle counselling",
  "Psychological or counselling sessions",
  "Care coordination meetings",
  "Home health visits",
  "Patient education",
  "Monitoring symptoms",
  "Advance Directive Review",
];

export const relations = [
  { value: "husband", label: "Husband" },
  { value: "wife", label: "Wife" },
  { value: "partner", label: "Partner" },
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

export const titles = ["Mr", "Mrs", "Miss", "Ms", "Chief", "Dr", "Prof"];

export const immunizationTypes = [
  "Lonza",
  "Pfizer",
  "Sanofi",
  "Moderna",
  "Sinovac",
];

export const genoTypes = ["AA", "AS", "SS", "Other"];
