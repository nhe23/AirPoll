import type { Columns } from "../../../types";
export const measurementsColumns: Array<Columns> = [
  {
    sizeClass: "is-2",
    keys: [{ sortedDesc: false, name: "Location", internalName: "location" }],
  },
  {
    sizeClass: "is-2",
    keys: [
      { sortedDesc: false, name: "City", internalName: "city" },
      { sortedDesc: false, name: "Country", internalName: "country" },
    ],
  },
  {
    sizeClass: "is-2",
    keys: [
      { sortedDesc: false, name: "Parameter", internalName: "parameter" },
    ],
  },
  {
    sizeClass: "is-2",
    keys: [{ sortedDesc: false, name: "Value", internalName: "value" }],
  },
  {
    sizeClass: "is-2",
    keys: [
      { sortedDesc: false, name: "Longitude", internalName: "longitude" },
      { sortedDesc: false, name: "Latitude", internalName: "latitude" },
    ],
  },
  {
    sizeClass: "is-2",
    keys: [
      { sortedDesc: false, name: "Updated", internalName: "lastUpdated" },
    ],
  },
];
