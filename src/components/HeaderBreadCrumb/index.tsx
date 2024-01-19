import { Box, Breadcrumbs, Typography, Link } from "@mui/material";

interface LinkItem {
  label: string;
  href?: string;
  icon?: string;
}

interface Props {
  heading: string;
  links: LinkItem[];
}

export default function HeaderBreadCrumb({ heading, links }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", px: "20px", pt: "20px" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={600}
            fontSize={28}
            sx={{ color: "#000", textTransform: "capitalize" }}
          >
            {heading}
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            {links.map((link, index) => (
              <div key={index}>
                {index === links.length - 1 ? (
                  <Typography variant="body2" fontWeight={500} color="#667185">
                    {link.icon} {link.label}
                  </Typography>
                ) : (
                  <Link
                    fontWeight={500}
                    href={link.href}
                    color="#099250"
                    underline="none"
                    variant="body2"
                    sx={{ display: "flex" }}
                  >
                    <img
                      src={link.icon}
                      style={{
                        fontSize: "inherit",
                        marginRight: "4px",
                        color: "#099250",
                      }}
                      alt=""
                    />
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
