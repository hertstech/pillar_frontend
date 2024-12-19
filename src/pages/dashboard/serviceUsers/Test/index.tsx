import { Box } from "@mui/material";
import { client } from "../../../../types/serviceUserTypes/health";
import NoResultIllustration from "../../../../components/NoResult";

interface IProps {
  client: client;
}

const ServiceUserTest: React.FC<IProps> = ({ client }) => {
  console.log("client data:", client);
  return (
    <Box>
      <Box>
        <NoResultIllustration
          text={"No tests added yet"}
          description="Add new test result here"
          linkDesc="Add test result"
          linkTo={`add-test`}
        />
      </Box>
    </Box>
  );
};

export default ServiceUserTest;
