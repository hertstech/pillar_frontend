import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import HeaderBreadCrumb from "../../../components/HeaderBreadCrumb/index.tsx";
import Users from "/assets/users.svg";
import Grids from "/assets/grid.svg";
import UserCard from "../../../components/UserCard/index.tsx";
// import { users } from "./_users.tsx";
import { useEffect, useState } from "react";
import UserTable from "../../../components/UserTable/index.tsx";
import {
  Link,
  useLocation,
  // , useNavigate, useParams
} from "react-router-dom";

export default function ResultPage() {
  // const { id } = useParams();

  const location = useLocation();

  const [searchResults, setSearchResults] = useState([]);

  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      setSearchResults(location.state.searchResults);
    }
  }, [location]);
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HeaderBreadCrumb
          heading="Results"
          links={[
            { label: "Dashboard", href: "/dashboard", icon: Grids },
            { label: "Clients", href: "", icon: Users },
            { label: "Search results", href: "" },
          ]}
        />
        <Stack alignItems="start">
          <Link
            style={{
              fontWeight: 500,
              color: "#FFF",
              textDecoration: "none",
              borderRadius: 10,
              display: "flex",
              background: "#099250",
              padding: 16,
              gap: 5,
            }}
            to="/dashboard/new"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="button-icon">
                <g id="icon">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7ZM12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.55543 21.9174C8.22982 22.6502 10.4595 23 12 23C13.5405 23 15.7702 22.6502 17.4446 21.9174C18.2666 21.5576 19.1025 21.0427 19.5882 20.2974C19.8437 19.9054 20.0052 19.4437 19.9999 18.9282C19.9946 18.4174 19.8266 17.9281 19.5441 17.4728C18.1747 15.2656 15.3732 13 12 13C8.62679 13 5.82532 15.2656 4.45591 17.4728C4.17344 17.9281 4.00537 18.4174 4.00013 18.9282C3.99483 19.4437 4.15632 19.9054 4.41175 20.2974C4.89745 21.0427 5.73343 21.5576 6.55543 21.9174ZM6.00002 18.9487C6.00077 18.8757 6.02372 18.7394 6.15539 18.5272C7.27754 16.7185 9.51566 15 12 15C14.4843 15 16.7225 16.7185 17.8446 18.5272C17.9763 18.7394 17.9992 18.8757 18 18.9487C18.0007 19.017 17.9831 19.0973 17.9126 19.2055C17.7465 19.4605 17.3429 19.7787 16.6427 20.0852C15.2726 20.6848 13.3268 21 12 21C10.6732 21 8.72744 20.6848 7.35732 20.0852C6.65707 19.7787 6.25354 19.4605 6.08736 19.2055C6.01686 19.0973 5.99932 19.017 6.00002 18.9487Z"
                    fill="white"
                  />
                  <path
                    d="M21 3C21 2.44772 20.5523 2 20 2C19.4477 2 19 2.44772 19 3V4H18C17.4477 4 17 4.44772 17 5C17 5.55228 17.4477 6 18 6H19V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V6H22C22.5523 6 23 5.55228 23 5C23 4.44772 22.5523 4 22 4H21V3Z"
                    fill="white"
                  />
                </g>
              </g>
            </svg>
            <span>Add New Record</span>
          </Link>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="flex-end">
        <ButtonGroup>
          <Button
            sx={{
              border: 0,
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              color: isGrid ? "#475367" : "#D0D5DD",
            }}
            onClick={() => setIsGrid(true)}
            endIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill={isGrid ? "#475367" : "#D0D5DD"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.33333 9.58333C2.18274 9.58333 1.25 8.65059 1.25 7.5V3.33333C1.25 2.18274 2.18274 1.25 3.33333 1.25H7.5C8.65059 1.25 9.58333 2.18274 9.58333 3.33333V7.5C9.58333 8.65059 8.65059 9.58333 7.5 9.58333H3.33333ZM2.91667 7.5C2.91667 7.73012 3.10321 7.91667 3.33333 7.91667L7.5 7.91667C7.73012 7.91667 7.91667 7.73012 7.91667 7.5V3.33333C7.91667 3.10322 7.73012 2.91667 7.5 2.91667L3.33333 2.91667C3.10321 2.91667 2.91667 3.10322 2.91667 3.33333L2.91667 7.5Z"
                  // fill="#D0D5DD"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.25 16.6667C1.25 17.8173 2.18274 18.75 3.33333 18.75H7.5C8.65059 18.75 9.58333 17.8173 9.58333 16.6667V12.5C9.58333 11.3494 8.65059 10.4167 7.5 10.4167H3.33333C2.18274 10.4167 1.25 11.3494 1.25 12.5V16.6667ZM3.33333 17.0833C3.10321 17.0833 2.91667 16.8968 2.91667 16.6667L2.91667 12.5C2.91667 12.2699 3.10321 12.0833 3.33333 12.0833H7.5C7.73012 12.0833 7.91667 12.2699 7.91667 12.5V16.6667C7.91667 16.8968 7.73012 17.0833 7.5 17.0833H3.33333Z"
                  // fill="#D0D5DD"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4167 16.6667C10.4167 17.8173 11.3494 18.75 12.5 18.75H16.6667C17.8173 18.75 18.75 17.8173 18.75 16.6667V12.5C18.75 11.3494 17.8173 10.4167 16.6667 10.4167H12.5C11.3494 10.4167 10.4167 11.3494 10.4167 12.5V16.6667ZM12.5 17.0833C12.2699 17.0833 12.0833 16.8968 12.0833 16.6667V12.5C12.0833 12.2699 12.2699 12.0833 12.5 12.0833H16.6667C16.8968 12.0833 17.0833 12.2699 17.0833 12.5V16.6667C17.0833 16.8968 16.8968 17.0833 16.6667 17.0833H12.5Z"
                  // fill="#D0D5DD"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4167 7.5C10.4167 8.65059 11.3494 9.58333 12.5 9.58333H16.6667C17.8173 9.58333 18.75 8.65059 18.75 7.5V3.33333C18.75 2.18274 17.8173 1.25 16.6667 1.25H12.5C11.3494 1.25 10.4167 2.18274 10.4167 3.33333V7.5ZM12.5 7.91667C12.2699 7.91667 12.0833 7.73012 12.0833 7.5V3.33333C12.0833 3.10322 12.2699 2.91667 12.5 2.91667L16.6667 2.91667C16.8968 2.91667 17.0833 3.10322 17.0833 3.33333V7.5C17.0833 7.73012 16.8968 7.91667 16.6667 7.91667L12.5 7.91667Z"
                  // fill="#D0D5DD"
                />
              </svg>
            }
          >
            Grid View
          </Button>
          <Button
            sx={{
              border: 0,
              outline: "none",
              textTransform: "capitalize",
              fontWeight: 600,
              color: isGrid ? "#D0D5DD" : "#475367",
            }}
            color="inherit"
            onClick={() => setIsGrid(false)}
            endIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill={isGrid ? "#D0D5DD" : "#475367"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="button-icon">
                  <path
                    id="Vector 739"
                    d="M17.916 3.33333H6.24935"
                    stroke={isGrid ? "#D0D5DD" : "#475367"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector 740"
                    d="M17.916 10H6.24935"
                    stroke={isGrid ? "#D0D5DD" : "#475367"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector 741"
                    d="M17.916 16.6667H6.24935"
                    stroke={isGrid ? "#D0D5DD" : "#475367"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <ellipse
                    id="Ellipse 69"
                    cx="1.04167"
                    cy="1.04167"
                    rx="1.04167"
                    ry="1.04167"
                    transform="matrix(-1 0 0 1 3.75 2.29167)"
                    // fill="#475367"
                  />
                  <ellipse
                    id="Ellipse 70"
                    cx="1.04167"
                    cy="1.04167"
                    rx="1.04167"
                    ry="1.04167"
                    transform="matrix(-1 0 0 1 3.75 8.95833)"
                    // fill="#475367"
                  />
                  <ellipse
                    id="Ellipse 71"
                    cx="1.04167"
                    cy="1.04167"
                    rx="1.04167"
                    ry="1.04167"
                    transform="matrix(-1 0 0 1 3.75 15.625)"
                    // fill="#475367"
                  />
                </g>
              </svg>
            }
          >
            List View
          </Button>
        </ButtonGroup>
      </Stack>

      {isGrid ? (
        <Box
          sx={{
            display: "grid",
            marginBottom: 10,
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          <UserCard user={searchResults} />
        </Box>
      ) : (
        <UserTable results={searchResults} />
      )}
    </Box>
  );
}
