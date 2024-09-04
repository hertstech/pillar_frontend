import React, { useEffect } from "react";
import DrawerComp from "../../../../components/Drawer";
import { EditIcon } from "../../../../assets/icons";
import { Box, Button } from "@mui/material";
import { MoveBackComp } from "../../../../components/MoveBack";
import { CustomSelect } from "../../../../components/Select";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type HealthRecType = {
  id: string;
};

type FormValues = {
  category: string;
};

const schema = Joi.object({
  category: Joi.string().required().label("Category"),
});

export const UpdateHealthRec: React.FC<HealthRecType> = ({ id }) => {
  console.log("the id to pick data for update:", id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
  });

  const selectedValue = useWatch({
    control,
    name: "category",
  });

  useEffect(() => {
    setValue("category", selectItems[0].value);
  }, [setValue]);

  const onSubmit = (data: FormValues, event?: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    console.log("Form Submitted:", data);
  };

  const selectItems = [
    { id: "1", name: "Category 1", value: "cat1" },
    { id: "2", name: "Category 2", value: "cat2" },
    { id: "3", name: "Category 3", value: "cat3" },
  ];

  return (
    <>
      <DrawerComp
        sx={{
          gap: "4px",
          width: "106px",
          color: "#099250",
          outline: "none",
          fontWeight: 600,
          border: "1px solid",
          borderRadius: "16px",
          borderColor: "#E7E9FB",
          backgroundColor: "transparent",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#099250",
            color: "white",
          },
        }}
        isIcon={<EditIcon />}
        buttonText="Edit"
      >
        <Box
          sx={{
            width: "525px",
            paddingX: "24px",
            paddingTop: "75px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <MoveBackComp
            title="Update health information"
            subTitle="Some sickness here"
            onMovingBack={() => null}
          />
          <form style={{ marginTop: "32px" }} onSubmit={handleSubmit(onSubmit)}>
            <CustomSelect
              label="Category"
              name="category"
              selectItems={selectItems}
              value={selectedValue}
              onChange={(value) => setValue("category", value)}
              register={register}
              validationError={errors.category}
            />

            {errors.category && (
              <p style={{ color: "red" }}>{errors.category.message}</p>
            )}

            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </DrawerComp>
    </>
  );
};
