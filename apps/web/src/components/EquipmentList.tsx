"use client"

import { useState } from "react";
import type { Equipment } from "@/lib/api";
import { EditEquipment } from "./EditEquipment";
import { DeletingEquipment } from "./DeletingEquipment";
import { Modal } from "./Modal";

const equipmentColumns: Record<string, keyof Equipment> = {
  'Name': 'name',
  'Manufacturer': 'manufacturer',
  'Purchase Date': 'purchaseDate',
};

type Dialog =
  | { mode: "edit"; item: Equipment }
  | { mode: "delete"; item: Equipment }
  | null;

const dialogTitle = (d: Dialog) => {
  if (!d) return "";
  return d.mode === "edit" ? `Edit ${d.item.name}` : `Delete ${d.item.name}`;
};

export function EquipmentList({ equipment }: { equipment: Equipment[] }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = () => setDialog(null);

  if (equipment.length === 0) {
    return (
      <p>
        No equipment yet. POST one to <code>/api/equipment</code>.
      </p>
    );
  }

  return (
    <>
      <div className="bg-stone-800 rounded p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b-1 border-stone-400">
              {Object.entries(equipmentColumns).map(([label, key]) => (
                <th key={key} className="text-start">
                  {label}
                </th>
              ))}
              <th className="text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id} className="border-b border-stone-400">
                {Object.values(equipmentColumns).map((key) => (
                  <td key={key}>{String(item[key])}</td>
                ))}
                <td className="flex gap-2">
                  <div>
                    <button onClick={() => setDialog({ mode: "edit", item })} className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out">Edit</button>
                  </div>
                  <div>
                    <button onClick={() => setDialog({ mode: "delete", item })} className="bg-red-800 text-white py-0 px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
}
