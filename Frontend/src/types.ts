export interface MeasurementResult {}

export interface Columns {
  sizeClass: string;
  keys: Key[];
}

export interface Key {
  sortedDesc: boolean;
  name: string;
  internalName: string;
}

export interface CitiesStartsWith {
  data: {
    citiesStartsWith: Array<CitiesResult>;
  };
}

export interface CitiesResult {
  name: string;
}

export interface Countries {
  data: {
    countries: Array<Country>;
  };
}

export interface Country {
  name: string;
  code: string;
}

export interface MeasurementResult {
  _id: string;
  country: string;
  city: string;
  location: string;
  longitude: number;
  latitude: number;
  parameter: string;
  value: number;
  lastUpdated: Date;
  unit: string;
  qualityIndex: number;
}

export interface LocationResults {
  _id: string;
  location: string;
  city: string;
  country: {
    name: string;
  };
  measurements: Array<{
    parameter: string;
    value: number;
    lastUpdated: Date;
    unit: string;
    qualityIndex: number;
  }>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
