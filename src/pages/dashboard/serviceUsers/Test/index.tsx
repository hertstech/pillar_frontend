import { Box, MenuItem, Select } from "@mui/material";
import { client } from "../../../../types/serviceUserTypes/health";
import NoResultIllustration from "../../../../components/NoResult";
import { Link, useParams } from "react-router-dom";
import { LuFlaskConical } from "react-icons/lu";
import Tabs from "../Health/Components/tab";
import AllTestResult from "./AllTestResult";
import { useGetAllTest } from "../../../../api/HealthServiceUser/test";
import { Spinner } from "../../../../components/Spinner";
import DraftedResult from "./DraftedResult";
import ArchivedResults from "./ArchievedResults";

interface IProps {
  client: client;
}

const ServiceUserTest: React.FC<IProps> = ({ client }) => {
  const { id } = useParams();

  const { data, isLoading, isPending } = useGetAllTest(id as string);

  if (isLoading || isPending) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Spinner title="Loading tests..." />
      </div>
    );
  }

  return (
    <Box>
      <Box>
        {!data?.data || data.data.length === 0 ? (
          <NoResultIllustration
            text={"No tests added yet"}
            description="Add new test result here"
            linkDesc="Add test result"
            linkTo={`add-test`}
          />
        ) : (
          <Box className="flex flex-col gap-6">
            <Box className="flex justify-between items-center">
              <p className="text-sm font-semibold leading-5">
                View all {client.firstName}'s
                {""} test results here
              </p>
              <Link
                to="add-test"
                className="text-pri-650 font-semibold flex items-center gap-1"
              >
                <LuFlaskConical /> Add test result
              </Link>
            </Box>
            <Box className="flex relative flex-col gap-4 pt-6 justify-between min-h-[70px] bg-white px-6">
              <Tabs
                w="w-1/2"
                tabs={[
                  {
                    label: "Results",
                    content: (
                      <AllTestResult data={data?.data} isLoading={isLoading} />
                    ),
                  },
                  {
                    label: "Draft",
                    content: (
                      <DraftedResult data={data?.data} isLoading={isLoading} />
                    ),
                  },
                  {
                    label: "Archived",
                    content: (
                      <ArchivedResults data={data?.data} isLoading={isLoading} />
                    ),
                  },
                ]}
              />
              <Box className="flex items-center gap-4 absolute top-8 right-8">
                {renderSelect("Sort by:", "Recent", [
                  "Recent",
                  "Older",
                  "From z-A",
                  "From A-Z",
                  "Successful",
                  "Unsuccessful",
                ])}
                {renderSelect("Filter by:", "All Activities", [
                  "All Activities",
                  "My Activities",
                ])}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServiceUserTest;

const renderSelect = (
  label: string,
  defaultValue: string,
  options: string[]
) => (
  <label className="flex items-center gap-4 text-sm font-semibold text-neu-600">
    {label}
    <Select
      defaultValue={defaultValue}
      sx={{
        minWidth: 80,
        fontSize: 12,
        maxHeight: 30,
        border: "none",
        color: "#2A2D32",
        fontWeight: 500,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px #F2F4F7 solid",
        },
        ".MuiOutlinedInput-input": { px: 2, py: 1 },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option} sx={{ fontSize: 12 }}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </label>
);
