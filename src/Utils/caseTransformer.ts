import { snakeCase } from "lodash";

type SnakeCasedObject = { [key: string]: any };

export const transformToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToSnakeCase);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce<SnakeCasedObject>((acc, key) => {
      const snakeKey = snakeCase(key);
      acc[snakeKey] = transformToSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
