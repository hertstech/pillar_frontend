import { MdOutlineWaterDrop } from "react-icons/md";
import { GiKidneys } from "react-icons/gi";
import {
  HeartSquaredIcon,
  LiverIcon,
  ThyroidIcon,
} from "../../../../../assets/Icons";

export const icons: Record<
  "blood" | "lipid-profile" | "liver" | "kidney" | "thyroid",
  JSX.Element
> = {
  blood: <MdOutlineWaterDrop size={22} />,
  "lipid-profile": <HeartSquaredIcon />,
  liver: <LiverIcon />,
  kidney: <GiKidneys size={22} />,
  thyroid: <ThyroidIcon />,
};
