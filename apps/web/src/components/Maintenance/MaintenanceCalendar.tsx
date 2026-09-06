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
  allDay?: boolean;
  equipment?: string;
};

const localizer = dayjsLocalizer(dayjs);

const VIEWS: View[] = [Views.MONTH, Views.WEEK, Views.DAY];

type MaintenanceCalendarProps = {
  events?: CalendarEvent[];
  defaultDate?: Date;
};

export function MaintenanceCalendar({ events, defaultDate }: MaintenanceCalendarProps) {
  const anchor = useMemo(() => defaultDate ?? new Date(), [defaultDate]);

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
