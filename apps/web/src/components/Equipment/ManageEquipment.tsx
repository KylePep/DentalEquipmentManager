"use client"

import { Equipment } from "@/lib/api";
import { Modal } from "@/components/Layout/Modal";
import { EditEquipment } from "@/components/Equipment/EditEquipment";
import { DeletingEquipment } from "@/components/Equipment/DeletingEquipment";
import { useState } from "react";

interface ManageEquipmentProps {
  equipment: Equipment;
}

export function ManageEquipment({ equipment }: ManageEquipmentProps) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = () => setDialog(null);

  type Dialog =
    | { mode: "edit"; item: Equipment }
    | { mode: "delete"; item: Equipment }
    | null;

  const dialogTitle = (d: Dialog) => {
    if (!d) return "";
    return d.mode === "edit" ? `Edit ${d.item.name}` : `Delete ${d.item.name}`;
  };

  return (
    <>
      <button onClick={() => setDialog({ mode: "edit", item: equipment })} className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out">Edit</button>
      <button onClick={() => setDialog({ mode: "delete", item: equipment })} className="bg-red-800 text-white py-0 px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Delete</button>

      <Modal
        isOpen={dialog !== null}
        onClose={close}
        title={dialogTitle(dialog)}
      >
        {dialog?.mode === "edit" && (
          <EditEquipment equipment={dialog.item} onSaved={close} />
        )}
        {dialog?.mode === 'delete' && (
          <DeletingEquipment equipment={dialog.item} onDelete={close} />
        )}
      </Modal>
    </>
  )
}