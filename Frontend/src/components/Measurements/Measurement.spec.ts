import Measurement from "./Measurement.svelte";
import { render, fireEvent } from "@testing-library/svelte";

const result = {
  _id: "1234",
  country: "Tattoine",
  location: "Cantina",
  city: "Mos Eisley",
  longitude: 1234,
  latitude: 4312,
  parameter: "speed",
  value: 12,
  lastUpdated: new Date(Date.now()),
  unit: "parsec",
  qualityIndex: 1,
};

it("should render result", async () => {
  const { getByTestId } = render(Measurement, { result });
  const desktop = getByTestId("measurementDesktop");
  const mobile = getByTestId("measurementMobile");

  expect(
    mobile.querySelector('span[data-testid="locationMobile"]').firstChild
      .textContent
  ).toBe(result.location);

  expect(
    desktop.querySelector('span[data-testid="locationDesktop"]').firstChild
      .textContent
  ).toBe(result.location);
});
