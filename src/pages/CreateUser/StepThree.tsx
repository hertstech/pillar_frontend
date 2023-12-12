import { Box, Card, Typography } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function StepThree() {
  const [copied, setCopied] = useState(false);

  const text = "485 777 3456";

  const onCopy = () => {
    setCopied(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          //   gap: 25,
          minHeight: 469,
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "60px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 64,
              width: 64,
              borderRadius: 100,
              background: "#E7F6EC",
              display: "grid",
              placeItems: "center",
              marginBottom: "15px",
            }}
          >
            <img src="/assets/check-circle.svg" alt="" />
          </div>
          <Typography
            fontWeight={600}
            fontSize={24}
            gutterBottom
            sx={{ color: "#1A1A21" }}
            variant="h5"
          >
            Record successfully created
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={16}
            sx={{ color: "#8C94A6" }}
            variant="body1"
          >
            Your client would also receive an email with their new NHR ID
          </Typography>
        </div>

        <Typography
          fontWeight={600}
          fontSize={32}
          //   lineHeight={40}
          sx={{ color: "#1A1A21" }}
          variant="h3"
        >
          {text}
        </Typography>

        <CopyToClipboard onCopy={onCopy} text={text}>
          <button
            style={{
              background: "#F0F2F5",
              borderRadius: 12,
              padding: "2px 12px",
              border: 0,
              outline: "none",
              width: 97,
              height: 24,
              margin: "2px auto",
            }}
            type="button"
            onClick={onCopy}
          >
            {copied ? "Copied" : "Copy ID"}
          </button>
        </CopyToClipboard>
      </Box>
    </>
  );
}
