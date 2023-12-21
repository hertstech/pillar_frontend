import moment from "moment";

import { Box, Card, Chip, Typography } from "@mui/material";
import Avatars from "../Avatar";
import { Link } from "react-router-dom";
import NoResultIllustration from "../NoResult";

export default function UserCard({ user }: { user: any }) {
  return (
    <>
      {user.length > 0 ? (
        user.map((item: any) => (
          <Link
            to={`/dashboard/user/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                cursor: "pointer",
                flexDirection: "column",
                maxWidth: 350,
                margin: "auto",
                borderRadius: 1.5,
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <Chip
                  label={"active"}
                  sx={{
                    background:
                      item.status === "active" ? "#FBEAE9" : "#E7F6EC",
                    color: item.status === "active" ? "#9E0A05" : "#036B26",
                    textTransform: "capitalize",
                  }}
                />
                <Chip
                  label={item.gender}
                  sx={{
                    background: "#F7F9FC",
                    color: "#344054",
                    textTransform: "capitalize",
                  }}
                />
              </Box>

              <Avatars height={"100px"} width={"100px"} />

              <div style={{ margin: "8px 0px 20px" }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  fontSize={16}
                  sx={{ color: "#101828", textAlign: "center" }}
                >
                  {item.firstName + " " + item.lastName}
                </Typography>

                <Typography fontSize={14} sx={{ textAlign: "center" }}>
                  <span style={{ color: "##475367", fontWeight: 400 }}>
                    NHR ID:
                  </span>
                  <span
                    style={{
                      color: "##475367",
                      fontWeight: 700,
                      marginLeft: 4,
                    }}
                  >
                    {item.id}
                  </span>
                </Typography>
              </div>

              <div style={{ marginBottom: 20 }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{ fontWeight: 400, fontSize: 14, color: "#475367" }}
                  >
                    Age
                  </span>
                  <span
                    style={{ fontWeight: 700, fontSize: 16, color: "#101928" }}
                  >
                    {moment(new Date()).diff(item.dateOfBirth, "years")} Years
                  </span>
                </Typography>
              </div>

              <div className="">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{ fontWeight: 400, fontSize: 14, color: "#475367" }}
                  >
                    Address
                  </span>
                  <span
                    style={{ fontWeight: 500, fontSize: 14, color: "#101928" }}
                  >
                    {item.address + " " + item.lga}
                  </span>
                </Typography>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <NoResultIllustration />
      )}
    </>
  );
}
