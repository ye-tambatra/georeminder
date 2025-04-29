import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const snakeToCamel = (obj: any) => {
   const newObj: any = {};
   for (const key in obj) {
      const camelKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
      newObj[camelKey] = obj[key];
   }
   return newObj;
};

export const camelToSnake = (obj: any) => {
   const newObj: any = {};
   for (const key in obj) {
      const snakeKey = key.replace(/([A-Z])/g, (m) => `_${m.toLowerCase()}`);
      newObj[snakeKey] = obj[key];
   }
   return newObj;
};
