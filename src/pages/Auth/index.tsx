import { Typography, Container, Box, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./sytles.module.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={Styles.wrap}>
      <Container component="main" maxWidth="md">
        <div className={Styles.wrapper}>
          <Stack alignItems="center">
            <Stack alignItems="center">
              <img src="/assets/logo.svg" className={Styles.Logo} alt="" />
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 1,
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

              <form onSubmit={handleSubmit} className={Styles.form}>
                <InputField
                  type="text"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
                <InputField
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />
                <div style={{ marginTop: 40 }}>
                  <Button title="SIgn In" />
                </div>
              </form>

              <Typography sx={{ mt: 2, fontSize: 14 }}>
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
          </Stack>
        </div>
      </Container>
      <div className={Styles.images}></div>
    </div>
  );
}
