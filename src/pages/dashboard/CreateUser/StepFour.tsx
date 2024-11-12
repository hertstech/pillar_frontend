import { Box, Link, Typography } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function StepFour({ data }: any) {
  const [copied, setCopied] = useState(false);

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
          minHeight: 517,
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
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35ZM26.1257 17.8958C26.8045 17.2741 26.8508 16.2198 26.2291 15.541C25.6074 14.8622 24.5531 14.8159 23.8743 15.4376L17.7209 21.0733L16.1257 19.6123C15.4469 18.9906 14.3926 19.0369 13.7709 19.7157C13.1492 20.3945 13.1955 21.4488 13.8743 22.0705L16.5952 24.5624C17.2322 25.1459 18.2095 25.1459 18.8465 24.5624L26.1257 17.8958Z"
                fill="#0F973D"
              />
            </svg>
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
          <span style={{ fontWeight: 400, fontSize: 16, color: "#8C94A6" }}>
            Your client would also receive an email with their new NHR ID
          </span>
        </div>

        <Typography
          fontWeight={600}
          fontSize={32}
          sx={{ color: "#1A1A21" }}
          variant="h3"
        >
          {data.NHRID}
        </Typography>

        <CopyToClipboard onCopy={onCopy} text={data.NHRID}>
          <button
            style={{
              background: copied ? "#D3F8DF" : "#00C3FF",
              borderRadius: 12,
              padding: "8px 16px",
              border: 0,
              outline: "none",
              margin: "2px auto",
              cursor: "pointer",
              display: "flex",
              gap: "4px",
            }}
            type="button"
            onClick={onCopy}
          >
            {copied ? "Copied" : "Copy ID"}
            <svg
              width="20"
              height="20"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon-right">
                <path
                  id="icon"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.83398 1.33333C8.36123 1.33333 7.16732 2.52724 7.16732 4V5.33333H4.50065C3.02789 5.33333 1.83398 6.52724 1.83398 8V12C1.83398 13.4728 3.02789 14.6667 4.50065 14.6667H7.16732C8.64008 14.6667 9.83398 13.4728 9.83398 12V10.6667H12.5007C13.9734 10.6667 15.1673 9.47276 15.1673 8V4C15.1673 2.52724 13.9734 1.33333 12.5007 1.33333H9.83398ZM9.83398 9.33333H12.5007C13.237 9.33333 13.834 8.73638 13.834 8V4C13.834 3.26362 13.237 2.66667 12.5007 2.66667H9.83398C9.0976 2.66667 8.50065 3.26362 8.50065 4V5.69009C9.29772 6.15117 9.83398 7.01296 9.83398 8V9.33333ZM3.16732 8C3.16732 7.26362 3.76427 6.66667 4.50065 6.66667H7.16732C7.9037 6.66667 8.50065 7.26362 8.50065 8V12C8.50065 12.7364 7.9037 13.3333 7.16732 13.3333H4.50065C3.76427 13.3333 3.16732 12.7364 3.16732 12V8Z"
                  fill="#344054"
                />
              </g>
            </svg>
          </button>
        </CopyToClipboard>
        <div
          style={{
            marginTop: "auto",
          }}
        >
          <Link
            href="/dashboard/home"
            fontWeight={500}
            color="#FFF"
            underline="none"
            variant="body2"
            borderRadius={2}
            sx={{
              display: "flex",
              background: "#2E90FA",
              p: 2,
              justifyContent: "center",
            }}
          >
            Go to Dashboard
          </Link>
        </div>
      </Box>
    </>
  );
}
