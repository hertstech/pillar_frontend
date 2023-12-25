import { Typography, Container, Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../sytles.module.css";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
// import axios from "axios";
import { dispatchUserLogin } from "../../../redux/userSlice";
import { axiosInstance } from "../../../Utils/axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
    setIsLoadingButton(false);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoadingButton(true);

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

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      dispatch(
        dispatchUserLogin({
          user: response?.data,
          access_token: response?.data?.access_token.access_token,
        })
      );

      navigate("/dashboard", { replace: true });

      return Swal.fire({
        icon: "success",
        title: `${response.data.message}`,
        text: `Welcome ${response.data.firstName}`,
        confirmButtonColor: "#099250",
      });
    } catch (error: any) {
      setIsLoadingButton(false);
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: `${error.response.data.message}`,
        confirmButtonColor: "#099250",
      });
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
                  Sign in to Pillar
                </Typography>
                <Typography>
                  Your gateway to effortless healthcare management! 🏥
                </Typography>
              </Box>

              <form className={Styles.form}>
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
                <div style={{ marginTop: 20 }}>
                  <Button
                    loading={isLoadingButton}
                    onClick={handleLogin}
                    title="Sign In"
                  />
                </div>
                <p className={Styles.errorText}>{error && error}</p>
              </form>

              <Typography sx={{ mt: 2, fontSize: 14 }}>
                I don’t have an account with Pillar,{" "}
                <Link
                  style={{ color: "#099250", textDecoration: "underline" }}
                  to={"/auth/register"}
                >
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </div>
      </Container>
      <div style={{ width: "100%" }}>
        <img className={Styles.images} src="/assets/Frame 625882.svg" alt="" />
      </div>
    </div>
  );
}
