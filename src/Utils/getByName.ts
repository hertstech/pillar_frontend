export const getNameByValue = (value: string, categoryData: any[]) => {
  for (const category of categoryData) {
    if (category.value === value) {
      return category.name;
    }
    const subValue = category.subValues.find((sub: any) => sub.value === value);
    if (subValue) {
      return subValue.name;
    }
  }
  return value;
};