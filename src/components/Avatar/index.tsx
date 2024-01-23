import { Avatar } from "@mui/material";

interface Style {
  height: string;
  width: string;
  src?: string;
}

export default function Avatars({ height, width, src }: Style) {
  return (
    <Avatar
      src={src}
      alt="User Image"
      style={{ height, width, margin: "auto" }}
    />
  );
}
