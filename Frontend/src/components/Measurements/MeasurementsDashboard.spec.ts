import fetchMock from "jest-fetch-mock";
import MeasurementsDashboard from "./MeasurementsDashboard.svelte";
import { render } from "@testing-library/svelte";

beforeAll(() => {
  fetchMock.enableMocks();
});
it("should render measurement components", async () => {
  const { getByTestId } = render(MeasurementsDashboard);
  const desktop = getByTestId("measurementsDashboard");
  
  expect(desktop.querySelector('div[data-testid="measurementsContainer"]')).not.toBe(null);
  expect(desktop.querySelector('div[data-testid="filterDesktop"]')).not.toBe(null);
  expect(desktop.querySelector('div[data-testid="measurementsDescription"]')).not.toBe(null);
});
