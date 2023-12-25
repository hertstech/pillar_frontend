import {
  Stack,
  //  Box, Divider,  Typography
} from "@mui/material";
import NoResultIllustration from "../../../components/NoResult";

// const notes = [
//   {
//     date: "10/11/2023",
//     time: "3:30pm",
//     comment:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum earum eius, doloremque voluptate rem culpa dolor eum, accusamus obcaecati perspiciatis animi? Officia, iusto eveniet at perferendis suscipit soluta nesciunt itaque corrupti! Perferendis tenetur voluptatem et fugit recusandae consequatur ex officia provident repellendus, nam ad, porro possimus accusantium nisi sequi.",
//     physician: "Dr. Scott",
//   },
//   {
//     date: "12/11/2023",
//     time: "12:00pm",
//     comment:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum earum eius, doloremque voluptate rem culpa dolor eum, accusamus obcaecati perspiciatis animi? Officia, iusto eveniet at perferendis suscipit soluta nesciunt itaque corrupti! Perferendis tenetur voluptatem et fugit recusandae consequatur ex officia provident repellendus, nam ad, porro possimus accusantium nisi sequi.",
//     physician: "Dr. Maxwell",
//   },
//   {
//     date: "16/11/2023",
//     time: "9:30am",
//     comment:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam nostrum earum eius, doloremque voluptate rem culpa dolor eum, accusamus obcaecati perspiciatis animi? Officia, iusto eveniet at perferendis suscipit soluta nesciunt itaque corrupti! Perferendis tenetur voluptatem et fugit recusandae consequatur ex officia provident repellendus, nam ad, porro possimus accusantium nisi sequi.",
//     physician: "Dr. Jackson",
//   },
// ];

export default function Notes() {
  return (
    <Stack
      sx={{
        background: "white",

        mb: 10,
      }}
    >
      <NoResultIllustration />
      {/* <Box sx={{}}>
        <Typography sx={{ py: 2, px: 3 }} fontWeight={600} fontSize={18}>
          Notes
        </Typography>
        <Divider />

        <Box sx={{ background: "white", px: 3 }}>
          {notes.map((item, index) => (
            <div style={{ margin: "20px auto" }} key={index}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#101928" }}>
                {item.date} | {item.time} .{" "}
                <span style={{ fontSize: 14, fontWeight: 400 }}>
                  {item.physician}
                </span>
              </span>
              <Typography
                fontSize={14}
                sx={{
                  border: "0.38px #E4E7EC solid",
                  borderRadius: 2,
                  background: "#F0F2F5",
                  color: "#98A2B3",
                  mt: 1,
                  p: 2,
                }}
              >
                {item.comment}
              </Typography>
            </div>
          ))}
        </Box>
      </Box> */}
    </Stack>
  );
}
