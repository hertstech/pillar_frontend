export const getStatusColor = (item:any) => {
  switch (item.treatmentStatus?.toLowerCase()) {
    case "pending":
      return "text-[#475367]";
    case "active":
      return "text-[#099137]";
    case "on_hold":
      return "text-[#DD900D]";
    case "completed":
      return "text-[#1570EF]";
    case "cancelled":
      return "text-[#CB1A14]";
    default:
      return "";
  }
};
