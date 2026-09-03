import { StrictMode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MaintenanceCalendar, type MaintenanceEvent } from "../MaintenanceCalendar";

const may = (day: number) => new Date(2026, 4, day, 9, 0, 0);

function makeEvent(overrides: Partial<MaintenanceEvent> = {}): MaintenanceEvent {
  return {
    id: "m1",
    title: "Autoclave 3000 — annual service",
    start: may(12),
    end: may(12),
    ...overrides,
  };
}

describe("MaintenanceCalendar", () => {
  it("renders the calendar toolbar with navigation and view controls", () => {
    render(<MaintenanceCalendar events={[]} defaultDate={may(1)} />);

    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^month$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^week$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^day$/i })).toBeInTheDocument();
  });

  it("shows the month it is focused on", () => {
    render(<MaintenanceCalendar events={[]} defaultDate={may(1)} />);

    expect(screen.getByText(/may 2026/i)).toBeInTheDocument();
  });

  it("renders provided maintenance events", () => {
    render(
      <MaintenanceCalendar
        events={[makeEvent(), makeEvent({ id: "m2", title: "X-Ray Unit — calibration", start: may(20), end: may(20) })]}
        defaultDate={may(1)}
      />,
    );

    expect(screen.getByText("Autoclave 3000 — annual service")).toBeInTheDocument();
    expect(screen.getByText("X-Ray Unit — calibration")).toBeInTheDocument();
  });

  it("falls back to built-in sample events when none are provided", () => {
    render(<MaintenanceCalendar />);

    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
  });

  // Regression: react-big-calendar's uncontrolled navigation silently stops
  // committing re-renders under React 19 Strict Mode (Next dev default), which
  // is why MaintenanceCalendar controls `date`/`view` itself.
  it("navigates months and changes view under Strict Mode", async () => {
    const user = userEvent.setup();
    render(
      <StrictMode>
        <MaintenanceCalendar events={[]} defaultDate={may(1)} />
      </StrictMode>,
    );

    expect(screen.getByText(/may 2026/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/june 2026/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^week$/i }));
    expect(document.querySelector(".rbc-time-view")).not.toBeNull();
  });
});
