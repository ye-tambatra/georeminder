import api from "@/lib/axios";
import { camelToSnake, snakeToCamel } from "@/lib/utils";

export enum TriggerType {
   EXIT = "exit",
   ENTER = "enter",
}

export interface Reminder {
   id?: number;
   title: string;
   description: string;
   triggerType: TriggerType;
   locationLat: number;
   locationLng: number;
}

export const createReminder = async (reminder: Reminder): Promise<Reminder> => {
   const response = await api.post<Reminder>("api/users/reminders/", camelToSnake(reminder));
   return snakeToCamel(response.data);
};

export const getReminders = async (): Promise<Reminder[]> => {
   const response = await api.get<Reminder[]>("api/users/reminders/");
   return response.data.map(snakeToCamel);
};

export const getReminderById = async (id: number): Promise<Reminder> => {
   const response = await api.get<Reminder>(`api/users/reminders/${id}/`);
   return snakeToCamel(response.data);
};

export const updateReminder = async (id: number, reminder: Reminder): Promise<Reminder> => {
   const response = await api.put<Reminder>(`api/users/reminders/${id}/`, camelToSnake(reminder));
   return snakeToCamel(response.data);
};

export const deleteReminder = async (id: number): Promise<void> => {
   await api.delete(`api/users/reminders/${id}/`);
};
