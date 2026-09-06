"use client"

import { MaintenanceEvent } from "@/lib/api"
import { useState } from "react";
import { Modal } from "../Layout/Modal";
import { EditMaintenance } from "./EditMaintenance";

interface MaintenanceEventEditorProps {
  maintenanceEvent: MaintenanceEvent;
}

export function MaintenanceEventEditor({ maintenanceEvent }: MaintenanceEventEditorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out"
      >
        Edit {maintenanceEvent?.title ?? "Event"}
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Event" >
        <EditMaintenance maintenanceEvent={maintenanceEvent} onSaved={() => setOpen(false)} />
      </Modal>
    </>
  )
}