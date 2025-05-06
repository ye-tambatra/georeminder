import { formatDistanceToNow, parseISO } from "date-fns";

export const formatRelativeTime = (dateString: string): string => {
   try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
   } catch (error) {
      return dateString;
   }
};

export const formatDateTime = (dateString: string): string => {
   try {
      const date = parseISO(dateString);
      return date.toLocaleString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
         hour: "2-digit",
         minute: "2-digit",
      });
   } catch (error) {
      return dateString;
   }
};

export const areDatesEqual = (dateString1: string, dateString2: string): boolean => {
   return parseISO(dateString1).getTime() === parseISO(dateString2).getTime();
};
