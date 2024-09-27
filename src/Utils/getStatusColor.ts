export const getStatusColor = (item: string | any, isBg: boolean = false) => {
  const status =
    typeof item === "string"
      ? item.toLowerCase()
      : item?.treatmentStatus?.toLowerCase();

  const statusColors: { [key: string]: string } = {
    pending: "text-[#475367]",
    active: "text-[#099137]",
    on_hold: "text-[#DD900D]",
    completed: "text-[#1570EF]",
    cancelled: "text-[#CB1A14]",
    approved: "text-[#099137]",
  };

  const bgColors: { [key: string]: string } = {
    pending: "bg-neu-100",
    active: "bg-green-50",
    on_hold: "bg-warn-100",
    completed: "bg-blue-100",
    cancelled: "bg-red-100",
    approved: "bg-green-100",
  };

  const textColor = statusColors[status] || "";

  const bgColor = isBg ? bgColors[status] || "" : "";

  return `${textColor} ${bgColor}`.trim();
};
