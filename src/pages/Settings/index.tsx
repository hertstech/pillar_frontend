import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HeaderTabs from "../../components/HeaderTabs";
import Buttons from "../../components/Button";
import General from "./General";
import Personal from "./Personal";
import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Management from "./Management";
import { axiosInstance } from "../../Utils";
import Swal from "sweetalert2";

const roles = [
  { label: "Tenant Admin", value: "super admin" },
  { label: "HCP", value: "admin" },
  { label: "Coordinator", value: "staff" },
];

const title = [
  "Mr.",
  "Mrs.",
  "Miss",
  "Ms.",
  "Dr.",
  "Prof.",
  "Rev.",
  "Hon.",
  "Capt.",
  "Sir.",
  "Dame",
];

export default function Settings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const [staffList, setStaffList] = useState<any[]>([]);

  const [organization, setOrganization] = useState({});

  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    position: "",
    title: "",
  };

  const [formField, setFormField] = useState(initialFormState);

  const handleChange = (name: string, value: any) => {
    setFormField({
      ...formField,
      [name || ""]: value,
    });
  };

  const getAllStaff = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/hcp/profile`);

      setOrganization(res.data);
      setStaffList(res.data.management);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post("hcp/create-tenet-account", formField);

      Swal.fire({
        icon: "success",
        title: `Success`,
        text: `You’ve created a new HCP`,
        confirmButtonColor: "#099250",
      });

      setIsLoading(false);
      setIsOpen(false);
      setFormField(initialFormState);
      getAllStaff();
    } catch (error: any) {
      setIsOpen(false);
      setFormField(initialFormState);
      Swal.fire({
        icon: "info",
        title: `Error`,
        text: `${error.response.data.detail}`,
        confirmButtonColor: "#099250",
      });
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ background: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "1px #E7E9FB solid",
          px: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={600}
          fontSize={28}
          sx={{
            color: "#000",
            textTransform: "capitalize",
            pt: "20px",
          }}
        >
          Settings
        </Typography>

        <Button
          sx={{
            textTransform: "none",
            background: "#099250",
            px: 2,
            alignItems: "center",
            color: "#F6FEF9",
            "&:hover": { backgroundColor: "#099250" },
            gap: 1,
            fontSize: "16px",
          }}
          startIcon={
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 1.25C8.87665 1.25 6.75 3.37665 6.75 6C6.75 8.62335 8.87665 10.75 11.5 10.75C14.1234 10.75 16.25 8.62335 16.25 6C16.25 3.37665 14.1234 1.25 11.5 1.25ZM8.25 6C8.25 4.20507 9.70507 2.75 11.5 2.75C13.2949 2.75 14.75 4.20507 14.75 6C14.75 7.79493 13.2949 9.25 11.5 9.25C9.70507 9.25 8.25 7.79493 8.25 6Z"
                fill="#F6FEF9"
              />
              <path
                d="M8.5 12.25C5.87665 12.25 3.75 14.3766 3.75 17C3.75 19.6234 5.87665 21.75 8.5 21.75H14.5C14.9142 21.75 15.25 21.4142 15.25 21C15.25 20.5858 14.9142 20.25 14.5 20.25H8.5C6.70507 20.25 5.25 18.7949 5.25 17C5.25 15.2051 6.70507 13.75 8.5 13.75H14.5C14.9142 13.75 15.25 13.4142 15.25 13C15.25 12.5858 14.9142 12.25 14.5 12.25H8.5Z"
                fill="#F6FEF9"
              />
              <path
                d="M19.25 14C19.25 13.5858 18.9142 13.25 18.5 13.25C18.0858 13.25 17.75 13.5858 17.75 14V16.25H15.5C15.0858 16.25 14.75 16.5858 14.75 17C14.75 17.4142 15.0858 17.75 15.5 17.75H17.75V20C17.75 20.4142 18.0858 20.75 18.5 20.75C18.9142 20.75 19.25 20.4142 19.25 20V17.75H21.5C21.9142 17.75 22.25 17.4142 22.25 17C22.25 16.5858 21.9142 16.25 21.5 16.25H19.25V14Z"
                fill="#F6FEF9"
              />
            </svg>
          }
          onClick={() => setIsOpen(true)}
        >
          Create HCP
        </Button>
      </Box>

      <HeaderTabs
        links={[
          {
            label: "General",
            icon: (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                // fill="inherit"
                stroke="currentColor"
                stroke-width="0.2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon / building-5">
                  <g id="icon">
                    <path
                      d="M6.33366 4.66667C6.33366 5.03486 6.03518 5.33333 5.66699 5.33333H5.00033C4.63214 5.33333 4.33366 5.03486 4.33366 4.66667C4.33366 4.29848 4.63214 4 5.00033 4H5.66699C6.03518 4 6.33366 4.29848 6.33366 4.66667Z"
                      fill="#344054"
                    />
                    <path
                      d="M8.33366 7.33333C8.70185 7.33333 9.00033 7.03486 9.00033 6.66667C9.00033 6.29848 8.70185 6 8.33366 6H7.66699C7.2988 6 7.00033 6.29848 7.00033 6.66667C7.00033 7.03486 7.2988 7.33333 7.66699 7.33333H8.33366Z"
                      fill="#344054"
                    />
                    <path
                      d="M6.33366 8.66667C6.33366 9.03486 6.03518 9.33333 5.66699 9.33333H5.00033C4.63214 9.33333 4.33366 9.03486 4.33366 8.66667C4.33366 8.29848 4.63214 8 5.00033 8H5.66699C6.03518 8 6.33366 8.29848 6.33366 8.66667Z"
                      fill="#344054"
                    />
                    <path
                      d="M8.33366 5.33333C8.70185 5.33333 9.00033 5.03486 9.00033 4.66667C9.00033 4.29848 8.70185 4 8.33366 4H7.66699C7.2988 4 7.00033 4.29848 7.00033 4.66667C7.00033 5.03486 7.2988 5.33333 7.66699 5.33333H8.33366Z"
                      fill="#344054"
                    />
                    <path
                      d="M6.33366 6.66667C6.33366 7.03486 6.03518 7.33333 5.66699 7.33333H5.00033C4.63214 7.33333 4.33366 7.03486 4.33366 6.66667C4.33366 6.29848 4.63214 6 5.00033 6H5.66699C6.03518 6 6.33366 6.29848 6.33366 6.66667Z"
                      fill="#344054"
                    />
                    <path
                      d="M8.33366 9.33333C8.70185 9.33333 9.00033 9.03486 9.00033 8.66667C9.00033 8.29848 8.70185 8 8.33366 8H7.66699C7.2988 8 7.00033 8.29848 7.00033 8.66667C7.00033 9.03486 7.2988 9.33333 7.66699 9.33333H8.33366Z"
                      fill="#344054"
                    />
                    <path
                      d="M6.33366 10.6667C6.33366 11.0349 6.03518 11.3333 5.66699 11.3333H5.00033C4.63214 11.3333 4.33366 11.0349 4.33366 10.6667C4.33366 10.2985 4.63214 10 5.00033 10H5.66699C6.03518 10 6.33366 10.2985 6.33366 10.6667Z"
                      fill="#344054"
                    />
                    <path
                      d="M8.33366 11.3333C8.70185 11.3333 9.00033 11.0349 9.00033 10.6667C9.00033 10.2985 8.70185 10 8.33366 10H7.66699C7.2988 10 7.00033 10.2985 7.00033 10.6667C7.00033 11.0349 7.2988 11.3333 7.66699 11.3333H8.33366Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.66699 3.33333C2.66699 2.59695 3.26395 2 4.00033 2H9.33366C10.07 2 10.667 2.59695 10.667 3.33333V6H12.667C13.4034 6 14.0003 6.59695 14.0003 7.33333V12.6667H14.667C15.0352 12.6667 15.3337 12.9651 15.3337 13.3333C15.3337 13.7015 15.0352 14 14.667 14H1.33366C0.965469 14 0.666992 13.7015 0.666992 13.3333C0.666992 12.9651 0.965469 12.6667 1.33366 12.6667H2.66699V3.33333ZM4.00033 12.6667H9.33366V3.33333H4.00033V12.6667ZM12.667 10V9.33333H12.3337C11.9655 9.33333 11.667 9.03486 11.667 8.66667C11.667 8.29848 11.9655 8 12.3337 8H12.667V7.33333H10.667V12.6667H12.667V11.3333H12.3337C11.9655 11.3333 11.667 11.0349 11.667 10.6667C11.667 10.2985 11.9655 10 12.3337 10H12.667Z"
                      fill="#344054"
                    />
                  </g>
                </g>
              </svg>
            ),
            content: <General organization={organization} />,
          },
          {
            label: "Personal",
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                // fill="inherit"
                stroke="currentColor"
                stroke-width="0.2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon / user">
                  <g id="icon">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.00033 1.33398C6.15938 1.33398 4.66699 2.82637 4.66699 4.66732C4.66699 6.50827 6.15938 8.00065 8.00033 8.00065C9.84128 8.00065 11.3337 6.50827 11.3337 4.66732C11.3337 2.82637 9.84128 1.33398 8.00033 1.33398ZM6.00033 4.66732C6.00033 3.56275 6.89576 2.66732 8.00033 2.66732C9.1049 2.66732 10.0003 3.56275 10.0003 4.66732C10.0003 5.77189 9.1049 6.66732 8.00033 6.66732C6.89576 6.66732 6.00033 5.77189 6.00033 4.66732Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.00032 15.334C6.97332 15.334 5.48687 15.1008 4.37061 14.6122C3.82261 14.3724 3.26529 14.0291 2.94149 13.5323C2.7712 13.2709 2.66355 12.9631 2.66708 12.6195C2.67057 12.2789 2.78262 11.9527 2.97094 11.6492C3.88387 10.1777 5.75152 8.66732 8.00032 8.66732C10.2491 8.66732 12.1168 10.1777 13.0297 11.6492C13.218 11.9527 13.3301 12.2789 13.3336 12.6195C13.3371 12.9631 13.2294 13.2709 13.0592 13.5323C12.7354 14.0291 12.178 14.3724 11.63 14.6122C10.5138 15.1008 9.02732 15.334 8.00032 15.334ZM4.10392 12.3521C4.01614 12.4936 4.00084 12.5845 4.00034 12.6331C3.99987 12.6787 4.01157 12.7322 4.05857 12.8043C4.16935 12.9743 4.43837 13.1865 4.90521 13.3908C5.81862 13.7905 7.11582 14.0007 8.00032 14.0007C8.88483 14.0007 10.182 13.7905 11.0954 13.3908C11.5623 13.1865 11.8313 12.9743 11.9421 12.8043C11.9891 12.7322 12.0008 12.6787 12.0003 12.6331C11.9998 12.5845 11.9845 12.4936 11.8967 12.3521C11.1486 11.1463 9.65655 10.0007 8.00032 10.0007C6.3441 10.0007 4.85202 11.1463 4.10392 12.3521Z"
                      fill="#344054"
                    />
                  </g>
                </g>
              </svg>
            ),
            content: <Personal />,
          },
          {
            label: "Staff Management",
            icon: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                // fill="inherit"
                stroke="currentColor"
                stroke-width="0.2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="icon / user-group">
                  <g id="icon">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.00047 3.33398C6.52771 3.33398 5.33381 4.52789 5.33381 6.00065C5.33381 7.47341 6.52771 8.66732 8.00047 8.66732C9.47323 8.66732 10.6671 7.47341 10.6671 6.00065C10.6671 4.52789 9.47323 3.33398 8.00047 3.33398ZM6.66714 6.00065C6.66714 5.26427 7.26409 4.66732 8.00047 4.66732C8.73685 4.66732 9.33381 5.26427 9.33381 6.00065C9.33381 6.73703 8.73685 7.33398 8.00047 7.33398C7.26409 7.33398 6.66714 6.73703 6.66714 6.00065Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.00047 14.6673C7.24255 14.6673 6.14972 14.4882 5.32037 14.1071C4.91354 13.9201 4.47702 13.6428 4.21954 13.2279C4.08361 13.0089 3.99773 12.7507 4.00054 12.4634C4.00332 12.1788 4.09258 11.9089 4.23873 11.6615C4.90705 10.5305 6.2935 9.33398 8.00047 9.33398C9.70744 9.33398 11.0939 10.5305 11.7622 11.6615C11.9084 11.9089 11.9976 12.1788 12.0004 12.4634C12.0032 12.7507 11.9173 13.0089 11.7814 13.2279C11.5239 13.6428 11.0874 13.9201 10.6806 14.1071C9.85122 14.4882 8.75839 14.6673 8.00047 14.6673ZM5.38664 12.3398C5.33559 12.4262 5.33388 12.4691 5.33381 12.4764C5.33375 12.4812 5.33359 12.4945 5.35242 12.5248C5.40535 12.6101 5.55907 12.7494 5.87713 12.8955C6.49754 13.1806 7.39303 13.334 8.00047 13.334C8.60791 13.334 9.5034 13.1806 10.1238 12.8955C10.4419 12.7494 10.5956 12.6101 10.6485 12.5248C10.6674 12.4945 10.6672 12.4816 10.6671 12.4767C10.6671 12.4694 10.6654 12.4262 10.6143 12.3398C10.0962 11.4629 9.08281 10.6673 8.00047 10.6673C6.91813 10.6673 5.90478 11.4629 5.38664 12.3398Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.66714 8.00065C1.66714 6.89608 2.56257 6.00065 3.66714 6.00065C4.77171 6.00065 5.66714 6.89608 5.66714 8.00065C5.66714 9.10522 4.77171 10.0007 3.66714 10.0007C2.56257 10.0007 1.66714 9.10522 1.66714 8.00065ZM3.66714 7.33398C3.29895 7.33398 3.00047 7.63246 3.00047 8.00065C3.00047 8.36884 3.29895 8.66732 3.66714 8.66732C4.03533 8.66732 4.33381 8.36884 4.33381 8.00065C4.33381 7.63246 4.03533 7.33398 3.66714 7.33398Z"
                      fill="#344054"
                    />
                    <path
                      d="M1.93096 12.9637C1.76727 13.2935 1.36721 13.4282 1.03741 13.2645C0.707612 13.1008 0.572957 12.7007 0.736651 12.3709C0.981574 11.8775 1.35229 11.382 1.81864 11.0029C2.28517 10.6237 2.88299 10.334 3.56525 10.334C3.93344 10.334 4.23192 10.6325 4.23192 11.0007C4.23192 11.3688 3.93344 11.6673 3.56525 11.6673C3.27127 11.6673 2.96099 11.7926 2.65967 12.0376C2.35818 12.2826 2.1013 12.6205 1.93096 12.9637Z"
                      fill="#344054"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5405 8.00065C10.5405 6.89608 11.4359 6.00065 12.5405 6.00065C13.6451 6.00065 14.5405 6.89608 14.5405 8.00065C14.5405 9.10522 13.6451 10.0007 12.5405 10.0007C11.4359 10.0007 10.5405 9.10522 10.5405 8.00065ZM12.5405 7.33398C12.1723 7.33398 11.8738 7.63246 11.8738 8.00065C11.8738 8.36884 12.1723 8.66732 12.5405 8.66732C12.9087 8.66732 13.2072 8.36884 13.2072 8.00065C13.2072 7.63246 12.9087 7.33398 12.5405 7.33398Z"
                      fill="#344054"
                    />
                    <path
                      d="M15.2672 12.3709C15.4309 12.7007 15.2963 13.1008 14.9665 13.2645C14.6367 13.4282 14.2366 13.2935 14.0729 12.9637C13.9026 12.6205 13.6457 12.2826 13.3442 12.0376C13.0429 11.7926 12.7326 11.6673 12.4386 11.6673C12.0704 11.6673 11.772 11.3688 11.772 11.0007C11.772 10.6325 12.0704 10.334 12.4386 10.334C13.1209 10.334 13.7187 10.6237 14.1852 11.0029C14.6516 11.382 15.0223 11.8775 15.2672 12.3709Z"
                      fill="#344054"
                    />
                  </g>
                </g>
              </svg>
            ),
            content: <Management isLoading={isLoading} staffList={staffList} />,
          },
        ]}
      />

      <>
        <Dialog maxWidth="sm" fullWidth open={isOpen}>
          <DialogTitle>Create HCP</DialogTitle>

          <Button
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              padding: "16px 8px",
            }}
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Teeny icon / x-small">
                <path
                  id="Vector"
                  d="M4.19922 4.2002L9.79922 9.8002M4.19922 9.8002L9.79922 4.2002"
                  stroke="#099250"
                />
              </g>
            </svg>
          </Button>

          <DialogContent>
            <form action="">
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <label htmlFor="title">
                  Title
                  <TextField
                    select
                    sx={{ marginTop: "5px" }}
                    fullWidth
                    name="title"
                    value={formField.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  >
                    {title.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </label>

                <InputField
                  type="text"
                  label="First Name"
                  name="firstName"
                  value={formField.firstName}
                  onChange={(e: any) => {
                    handleChange("firstName", e.target.value);
                  }}
                />
              </div>

              <InputField
                type="text"
                label="Last Name"
                name="lastName"
                value={formField.lastName}
                onChange={(e: any) => {
                  handleChange("lastName", e.target.value);
                }}
              />

              <InputField
                type="text"
                label="Email Address"
                name="email"
                value={formField.email}
                onChange={(e: any) => {
                  handleChange("email", e.target.value);
                }}
              />

              <label htmlFor="role" style={{ marginTop: "8px" }}>
                <span>Role</span>
                <TextField
                  select
                  fullWidth
                  sx={{ mt: "5px" }}
                  name="role"
                  value={formField.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  {roles.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </label>

              <InputField
                type="text"
                label="Job Title"
                name="position"
                value={formField.position}
                onChange={(e: any) => {
                  handleChange("position", e.target.value);
                }}
              />

              <Stack marginTop={3}>
                <Buttons
                  title="Create HCP"
                  loading={isLoading}
                  onClick={handleSubmit}
                />
              </Stack>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </Box>
  );
}
