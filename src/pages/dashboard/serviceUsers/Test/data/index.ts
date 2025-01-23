import { icons } from "../icons";

export const testData = {
  category: [
    {
      id: "1",
      name: "Blood",
      value: "blood",
      icon: icons.blood,
      subValues: [
        { id: "1-1", name: "Hemoglobin", value: "hemoglobin" },
        { id: "1-3", name: "White Blood Cells", value: "wbc" },
        { id: "1-2", name: "Red Blood Cells", value: "rbc" },
        { id: "1-4", name: "Platelets Count", value: "platelets" },
        { id: "1-5", name: "Haematocrit", value: "haematocrit" },
        {
          id: "1-6",
          name: "Mean Corpuscular Volume",
          value: "mcv",
        },
        {
          id: "1-7",
          name: "Mean Corpuscular Hb",
          value: "mch",
        },
        {
          id: "1-8",
          name: "Blood glucose (Fasting)",
          value: "bgf",
        },
        {
          id: "1-9",
          name: "Blood glucose (Random)",
          value: "bgr",
        },
        {
          id: "1-10",
          name: "Blood glucose (Glycated Haemoglobin)",
          value: "bgg",
        },
      ],
    },
    {
      id: "2",
      name: "Lipid profile",
      value: "lipid-profile",
      icon: icons["lipid-profile"],
      subValues: [{ id: "2-1", name: "Cholesterol", value: "cholesterol" }],
    },
    {
      id: "3",
      name: "Liver function test",
      value: "liver",
      icon: icons.liver,
      subValues: [
        { id: "3-1", name: "Alanine Aminotransferase (ALT)", value: "alt" },
        { id: "3-2", name: "Aspartate Aminotransferase (AST)", value: "ast" },
        { id: "3-3", name: "Bilirubin (Total)", value: "bilirubin-tt" },
        { id: "3-4", name: "Alkaline Phosphatase (ALP)", value: "alp" },
        { id: "3-5", name: "Albumin", value: "albumin" },
        { id: "3-6", name: "Gamma - GT (GGT)", value: "ggt" },
      ],
    },
    {
      id: "4",
      name: "Kidney function test",
      value: "kidney",
      icon: icons.kidney,
      subValues: [
        { id: "4-1", name: "Creatinine", value: "creatinine" },
        {
          id: "4-3",
          name: "Glomerular Filtration Rate (GLR)",
          value: "glr",
        },
        { id: "4-2", name: "Urea", value: "urea" },
      ],
    },
    {
      id: "5",
      name: "Thyroid function test",
      value: "thyroid",
      icon: icons.thyroid,
      subValues: [
        { id: "5-1", name: "Thyroid Stimulating Hormone (TSH)", value: "tsh" },
        { id: "5-3", name: "Free T4", value: "t4" },
      ],
    },
  ],
};

export const testUnits: Record<string, string> = {
  hemoglobin: "g/dL",
  wbc: "10³/μL",
  rbc: "10⁶/μL",
  platelets: "10³/μL",
  haematocrit: "%",
  mcv: "fL",
  mch: "pg",
  bgf: "mg/dL",
  bgr: "mg/dL",
  bgg: "%",
  cholesterol: "mg/dL",
  alt: "U/L",
  ast: "U/L",
  bilirubinTotal: "mg/dL",
  alp: "U/L",
  albumin: "g/dL",
  ggt: "U/L",
  creatinine: "mg/dL",
  glr: "mL/min/1.73m²",
  urea: "mg/dL",
  tsh: "μIU/mL",
  t4: "ng/dL",
};

export const unitColors: Record<string, string> = {
  "g/dL": "text-blue-500",
  "mg/dL": "text-green-500",
  "mmol/L": "text-red-500",
  "10³/μL": "text-purple-500",
  "%": "text-yellow-500",
  fL: "text-orange-500",
  pg: "text-indigo-500",
  "U/L": "text-teal-500",
  "mL/min/1.73m²": "text-pink-500",
  "μIU/mL": "text-gray-500",
  "ng/dL": "text-cyan-500",
};

export const dummyTestData = [
  {
    id: 1,
    order_id: "ORD12345",
    order_by: "John Doe",
    test_number: 5,
    collection_site: "Site A",
    testDate: "2024-12-19T10:00:00Z",
  },
  {
    id: 2,
    order_id: "ORD67890",
    order_by: "Jane Smith",
    test_number: 3,
    collection_site: "Site B",
    testDate: "2024-12-18T14:30:00Z",
  },
  {
    id: 3,
    order_id: "ORD54321",
    order_by: "Alice Brown",
    test_number: 7,
    collection_site: "Site C",
    testDate: "2024-12-17T09:15:00Z",
  },
  {
    id: 4,
    order_id: "ORD98765",
    order_by: "Bob White",
    test_number: 2,
    collection_site: "Site D",
    testDate: "2024-12-16T11:45:00Z",
  },
  {
    id: 5,
    order_id: "ORD11223",
    order_by: "Charlie Black",
    test_number: 6,
    collection_site: "Site E",
    testDate: "2024-12-15T08:20:00Z",
  },
];

export const testResults = [
  {
    id: 1,
    category: "Test Category 1",
    date: "20-04-2024",
    type: "Test Type 1",
    value: "134",
    unit: "g/L",
  },
  {
    id: 2,
    category: "Test Category 2",
    date: "21-04-2024",
    type: "Test Type 2",
    value: "145",
    unit: "mg/dL",
  },
  {
    id: 3,
    category: "Test Category 3",
    date: "22-04-2024",
    type: "Test Type 3",
    value: "128",
    unit: "mmol/L",
  },
  {
    id: 4,
    category: "Test Category 4",
    date: "23-04-2024",
    type: "Test Type 4",
    value: "112",
    unit: "mEq/L",
  },
];
