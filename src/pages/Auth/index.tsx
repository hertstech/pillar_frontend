import {
  Typography,
  Container,
  Box,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
        <Box>
          <Stack></Stack>
          <Stack alignItems="center">
            <Box>
              <Typography
                variant="h1"
                sx={{
                  mb: 0.5,
                  fontSize: 44,
                  fontWeight: "bold",
                }}
              >
                Sign in to HERTs
              </Typography>
              <Typography>
                Your gateway to effortless healthcare management! 🏥
              </Typography>
            </Box>

            <form action="">
              <TextField
                name="email"
                value={formData.email}
                label="Email address"
                onChange={handleChange}
              />
              <TextField
                name="password"
                value={formData.password}
                label="Password"
                onChange={handleChange}
              />

              <Button
                style={{ background: "#099250", color: "#FFF" }}
                size="large"
              >
                Sign In
              </Button>
            </form>

            <Typography sx={{ mb: 5, fontSize: 14 }}>
              I don’t have an account with HERTs,{" "}
              <Link
                style={{ color: "#099250", textDecoration: "underline" }}
                to={"/"}
              >
                {" "}
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
