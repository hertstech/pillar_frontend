import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    color: "#667185",
    marginTop: -10,
    maxWidth: 220,
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #D0D5DD",
  },
}));
