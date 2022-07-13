export interface SettingStore {
  isLoading: boolean;
  currentList: ListItem[];
}

export interface Store {
  system: System;
}

export interface System {
  appName: string;
  version: string;
  isUnsupportedShown: boolean;
}

export interface ListItem {
  name: string;
  status: Status;
}

export enum Status {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = "RED"
}
