import { snakeCase } from "lodash";

export const transformToSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(transformToSnakeCase);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = snakeCase(key); 
      acc[snakeKey] = transformToSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};