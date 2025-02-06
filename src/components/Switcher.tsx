import {
  Box,
  FormControlLabel,
  FormLabel,
  Switch,
  Typography,
} from "@mui/material";

export const PlSwitcher = ({
  questionText,
  checked,
  onToggle,
}: {
  questionText: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <Box className="flex justify-between items-center font-normal gap-2">
    <FormLabel className="!text-sm max-w-[450px] xl:max-w-[550px] !font-normal">
      {questionText}
    </FormLabel>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxWidth: "105px",
        fontWeight: 400,
      }}
    >
      <Typography variant="body2">No</Typography>
      <FormControlLabel
        className="!text-sm"
        value="yes"
        control={
          <Switch
            sx={{ width: 62, height: 40, padding: 1.5 }}
            checked={checked}
            onChange={onToggle}
          />
        }
        label="Yes"
      />
    </Box>
  </Box>
);
