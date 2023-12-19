import moment from "moment";

import { Box, Card, Chip, Typography } from "@mui/material";
import Avatars from "../Avatar";
import { Link } from "react-router-dom";

export default function UserCard({ user }: any) {
  return (
    <Link to={`/dashboard/user/${user.id}`} style={{ textDecoration: "none" }}>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
          <Chip
            label={"inactive"}
            sx={{
              background: user.status !== "active" ? "#FBEAE9" : "#E7F6EC",
              color: user.status !== "active" ? "#9E0A05" : "#036B26",
              textTransform: "capitalize",
            }}
          />
          <Chip
            label={user.gender}
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
            {user.firstName + " " + user.lastName}
          </Typography>

          <Typography fontSize={14} sx={{ textAlign: "center" }}>
            <span style={{ color: "##475367", fontWeight: 400 }}>NHR ID:</span>
            <span style={{ color: "##475367", fontWeight: 700, marginLeft: 4 }}>
              {user.id}
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
            <span style={{ fontWeight: 400, fontSize: 14, color: "#475367" }}>
              Age
            </span>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#101928" }}>
              {moment(new Date()).diff(user.dateOfBirth, "years")} Years
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
            <span style={{ fontWeight: 400, fontSize: 14, color: "#475367" }}>
              Address
            </span>
            <span style={{ fontWeight: 500, fontSize: 14, color: "#101928" }}>
              {user.address + " " + user.lga}
            </span>
          </Typography>
        </div>
      </Card>
    </Link>
  );
}
