export const useFilterEmptyFields = <T extends Record<string, any>>(
  formField: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(formField).filter(([_, value]) => value !== "")
  ) as Partial<T>;
};
