export interface Location {
  id: number;
  description: string;
  isFinished: number;
  workHours?: WorkHours[];
}

export interface WorkHours {
  id?: number;
  locationId?: number;
  hours?: number;
  date?: string;
}

export interface LocationResponse {
  id: number;
  description: string;
  separates: {
    id: number;
    locationId: number;
    hours: number;
    date: string;
  }[];
}

export interface LocationRequest {
  Location: Location;
}

export interface WorkHoursRequest {
  WorkHours: WorkHours;
}
