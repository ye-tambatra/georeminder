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
   locationName?: string;
   createdAt?: string;
   updatedAt?: string;
}
