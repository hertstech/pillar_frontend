import { Box, Divider, Stack, Typography } from "@mui/material";

interface TextLabelProps {
  text: string;
  label: string;
}

const TextLabel = ({ text, label }: TextLabelProps) => (
  <label
    style={{
      fontWeight: 600,
      color: "#528BFF",
      fontSize: 14,
      margin: "20px 0px",
    }}
  >
    {label}
    <Typography fontWeight={500} fontSize={14} color={"#101928"}>
      {text}
    </Typography>
  </label>
);

export default function Assessment() {
  return (
    <Box sx={{ gap: 4, flexDirection: "column", display: "flex", mb: 10 }}>
      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 7th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack>

      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 6th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack>

      <Stack>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px #E4E7EC solid",
            gap: 2,
            background: "white",
            width: "100%",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
            Dr Ojo’s Assessment - 5th October 2021
          </Typography>

          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "16px 24px",
            }}
          >
            <TextLabel label="Health Condition" text="Severe Headache" />
            <TextLabel label="Prescription" text="Paracetamol tablet" />
            <TextLabel
              label="Comment"
              text="Patient looking to respond tp treatment"
            />
          </div>
        </Box>
      </Stack>
    </Box>
  );
}
