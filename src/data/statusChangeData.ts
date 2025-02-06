export const reasons = {
  pending: [
    { id: "0", name: "Patient health concern", value: "health_concern" },
    {
      id: "1",
      name: "Medication interaction",
      value: "medication_interaction",
    },
    { id: "2", name: "Medical findings", value: "medical_findings" },
    {
      id: "3",
      name: "Administrative factors",
      value: "administrative_factors",
    },
    { id: "4", name: "Emergency", value: "emergency" },
  ],

  holdCancel: [
    { id: "1", name: "Awaiting new information", value: "new_info" },
    { id: "2", name: "Treatment adjustment", value: "adjustment" },
    { id: "3", name: "Patient request", value: "request" },
    { id: "4", name: "Recorded in error", value: "error" },
    { id: "5", name: "Admin issues", value: "admin_issues" },
    { id: "6", name: "Health status changes", value: "status_changes" },
    { id: "7", name: "Reassessment", value: "reassessment" },
  ],
};

export const accessData = {
  specialty: [
    { id: "0", name: "Medical Emergency", value: "medical_emergency" },
    {
      id: "1",
      name: "Incapacitation",
      value: "incapacitation",
    },
    { id: "2", name: "Legal Authority", value: "legal_authority" },
    {
      id: "3",
      name: "Public Interest",
      value: "public_interest",
    },
  ],
};
