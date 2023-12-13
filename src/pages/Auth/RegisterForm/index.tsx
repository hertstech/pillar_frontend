import { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Styles from "../sytles.module.css";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com)$/i;

    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
    setIsLoadingButton(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoadingButton(true);
    if (formData.firstName === "" || formData.lastName === "") {
      setError("Please enter your name!");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Email is Invalid");
      return;
    }

    if (!isStrongPassword(formData.password) || formData.password.length < 8) {
      setError(
        "Password must contain 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Please ensure password correlates!");
      return;
    }

    console.log(formData);

    try {
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error(error, "error");
      setIsLoadingButton(false);
    }
  };
  return (
    <div className={Styles.container}>
      <Container component="main">
        <div className={Styles.wrapper}>
          <Stack alignItems="center">
            <Stack alignItems="center">
              <img src="/assets/logo.svg" className={Styles.Logo} alt="" />
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 1,
                    fontSize: 44,
                    fontWeight: "bold",
                  }}
                >
                  Sign up to Pillar
                </Typography>
                <Typography>
                  Your gateway to effortless healthcare management! 🏥
                </Typography>
              </Box>

              <form className={Styles.form}>
                <div className={Styles.name}>
                  <InputField
                    type="text"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <InputField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
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
                <InputField
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />
                <div style={{ marginTop: 20 }}>
                  <Button
                    onClick={handleSubmit}
                    loading={isLoadingButton}
                    title="Register"
                  />
                </div>

                <p className={Styles.errorText}>{error && error}</p>
              </form>
            </Stack>

            <Typography sx={{ mt: 2, fontSize: 14 }}>
              Already have an account with Pillar?{" "}
              <Link
                style={{ color: "#099250", textDecoration: "underline" }}
                to={"/auth/login"}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </div>
      </Container>
    </div>
  );
}
