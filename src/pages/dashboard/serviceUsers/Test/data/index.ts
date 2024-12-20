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
          value: "corpuscular-vol",
        },
        {
          id: "1-7",
          name: "Mean Corpuscular Hb",
          value: "corpuscular-hb",
        },
        {
          id: "1-8",
          name: "Blood glucose (Fasting)",
          value: "blood-glucose-fasting",
        },
        {
          id: "1-9",
          name: "Blood glucose (Random)",
          value: "blood-glucose-random",
        },
        {
          id: "1-10",
          name: "Blood glucose (Glycated Haemoglobin)",
          value: "blood-glucose-glycated-haemoglobin",
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

