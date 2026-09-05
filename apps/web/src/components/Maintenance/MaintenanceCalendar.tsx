"use client";

import { useCallback, useMemo, useState } from "react";
import { Calendar, dayjsLocalizer, Views, type View } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  equipment?: string;
};

const localizer = dayjsLocalizer(dayjs);

const VIEWS: View[] = [Views.MONTH, Views.WEEK, Views.DAY];

// /** Placeholder data until scheduled maintenance is backed by the API. */
// function buildSampleEvents(reference: Date): MaintenanceEvent[] {
//   const at = (dayOffset: number, hour: number) => {
//     const d = new Date(reference);
//     d.setDate(d.getDate() + dayOffset);
//     d.setHours(hour, 0, 0, 0);
//     return d;
//   };

//   return [
//     { id: "sample-1", title: "Autoclave 3000 — weekly spore test", equipment: "Autoclave 3000", start: at(1, 8), end: at(2, 9) },
//     { id: "sample-2", title: "X-Ray Unit — annual calibration", equipment: "X-Ray Unit", start: at(4, 13), end: at(6, 15) },
//     { id: "sample-3", title: "Compressor — filter replacement", equipment: "Compressor", start: at(-3, 10), end: at(-3, 11) },
//   ];
// }

type MaintenanceCalendarProps = {
  events?: CalendarEvent[];
  defaultDate?: Date;
};

export function MaintenanceCalendar({ events, defaultDate }: MaintenanceCalendarProps) {
  const anchor = useMemo(() => defaultDate ?? new Date(), [defaultDate]);
  // const data = useMemo(() => events ?? buildSampleEvents(anchor), [events, anchor]);

  // react-big-calendar's default export is wrapped in the legacy `uncontrollable`
  // HOC, whose internal state does not re-render under React 19 Strict Mode — so
  // the toolbar buttons look dead. Driving `date` and `view` ourselves bypasses it.
  const [date, setDate] = useState(anchor);
  const [view, setView] = useState<View>(Views.MONTH);

  const handleNavigate = useCallback((next: Date) => setDate(next), []);
  const handleView = useCallback((next: View) => setView(next), []);

  return (
    <div className="h-[70vh] bg-stone-900 text-stone-200 rounded p-2">
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleView}
        views={VIEWS}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        popup
      />
    </div>
  );
}
