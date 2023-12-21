import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import HeaderBreadCrumb from "../../components/HeaderBreadCrumb";
import Users from "/assets/users.svg";
import Grids from "/assets/grid.svg";
import UserCard from "../../components/UserCard";
// import { users } from "./_users.tsx";
import { useEffect, useState } from "react";
import UserTable from "../../components/UserTable/index.tsx";
import {
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
    <Box sx={{ pt: 2 }}>
      <HeaderBreadCrumb
        heading="Results"
        links={[
          { label: "Dashboard", href: "/dashboard", icon: Grids },
          { label: "Clients", href: "", icon: Users },
          { label: "Search results", href: "" },
        ]}
      />

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
