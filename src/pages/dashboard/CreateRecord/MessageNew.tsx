import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Styles from "../serviceUsers/styles.module.css";

export default function MessageNew() {
  const [message, setMessage] = React.useState("");
  return (
    <Box>
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Typography fontWeight={700} color={"#101928"} fontSize={32}>
          Send a Message
        </Typography>
      </div>

      <form action="">
        <label
          htmlFor="additional notes"
          style={{ marginTop: "8px", marginBottom: 10 }}
        >
          Enter your Message
          <textarea
            className={Styles.area}
            name={`additionalNote`}
            rows={8}
            cols={50}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </label>

        <Stack marginTop={5}>
          <Button
            size="large"
            sx={{
              color: "#FFF",
              outline: "none",
              fontWeight: 600,
              background: "#099250",
              "&:hover": { backgroundColor: "#099250" },
              px: 3,
              width: "100%",
            }}
            variant="outlined"
            // onClick={() => setIsOpen(true)}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
