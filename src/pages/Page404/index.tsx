import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Page404() {
  return (
    <Container
      sx={{
        maxWidth: 480,
        margin: "auto",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: 12,
      }}
    >
      <Box sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>
        <Typography sx={{ color: "text.secondary", margin: 5 }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Button
          to="/dashboard"
          color="success"
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
