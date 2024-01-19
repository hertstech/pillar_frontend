import moment from "moment";
import { Box, Card, Typography } from "@mui/material";
import Avatars from "../Avatar";
import { Link } from "react-router-dom";
import NoResultIllustration from "../NoResult";
import { useDispatch } from "react-redux";
import { dispatchClient } from "../../redux/clientSlice";

export default function UserCard({ user }: { user: any }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(dispatchClient({ tabId: "tab1", client: user }));
  };
  return (
    <>
      {user.length > 0 ? (
        user.map((item: any) => (
          <Link
            to={`/dashboard/user/${item.id}`}
            style={{ textDecoration: "none" }}
            onClick={handleClick}
            key={item.id}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flexDirection: "column",
                maxWidth: 320,
                margin: "auto",
                borderRadius: 1.5,
                justifyContent: "space-between",
                border: "1px #E7E9FB solid",
              }}
            >
              <Box
                sx={{
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  px: 3,
                  pt: 3,
                }}
              >
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
              </Box>

              <Box
                sx={{
                  background: "#FCFCFD",
                  p: 3,
                  borderTop: "1px #F2F4F7 solid",
                }}
              >
                <div
                  style={{
                    marginBottom: 20,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#475367",
                      }}
                    >
                      Status
                    </span>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: item.status === "active" ? "#36A150" : "#036B26",
                        textTransform: "capitalize",
                      }}
                    >
                      active
                    </Typography>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#475367",
                      }}
                    >
                      Age
                    </span>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#101928",
                      }}
                    >
                      {moment(new Date()).diff(item.dateOfBirth, "years")}Yrs
                    </Typography>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#475367",
                      }}
                    >
                      Gender
                    </span>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#101928",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.gender}
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#667185",
                    }}
                  >
                    Address
                  </span>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      color: "#101928",
                    }}
                  >
                    {item.address}
                  </Typography>
                </div>
              </Box>
            </Card>
          </Link>
        ))
      ) : (
        <NoResultIllustration />
      )}
    </>
  );
}
