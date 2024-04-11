import { Avatar, Box, Typography } from "@mui/material";
import Styles from "./styles.module.css";
import { Helmet } from "react-helmet-async";

import { useSelector } from "react-redux";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

export default function Page({ title, children }: PageProps) {
  const user = useSelector((state: any) => state.user.user);
  return (
    <>
      <Helmet>
        <title>{`${title} | Pillar`}</title>
      </Helmet>

      <Box sx={{ background: "white" }}>
        <header className={Styles.header}>
          <Typography
            color="#101928"
            variant="h4"
            fontWeight={600}
            fontSize={28}
          >
            {title}
          </Typography>
          <div className={Styles.item}>
            <div className={Styles.head}>
              <Avatar />
              <span className={Styles.nameId}>
                <span className={Styles.userName}>
                  {user.firstName + " " + user.lastName}
                </span>
                <span className={Styles.userID}>HRT-132422</span>
              </span>
            </div>
          </div>
        </header>

        <Box>{children}</Box>
      </Box>
    </>
  );
}
