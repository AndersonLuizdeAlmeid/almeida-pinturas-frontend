export interface MeasurePayload {
  description: string;
  separates: {
    width: number;
    height: number;
  }[];
}

export interface Measure {
  id: number;
  description: string;
  area: number;
  createdAt: string;
  separates: {
    id: number;
    measureId: number;
    width: number;
    height: number;
  }[];
}

export type SeparateMeasureRequest = {
  width: number;
  height: number;
};

export type MeasureResponse = {
  id: string;
  description: string;
  area: number;
  separates: SeparateMeasureRequest[];
};

export type CreateMeasureRequest = {
  description: string;
  area: number;
  separates: SeparateMeasureRequest[];
};

export type Wall = {
  width: number;
  height: number;
  area: number;
};
