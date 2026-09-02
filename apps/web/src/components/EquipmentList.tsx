import { deleteEquipmentAction } from "@/app/actions";
import type { Equipment } from "@/lib/api";

export function EquipmentList({ equipment }: { equipment: Equipment[] }) {
  if (equipment.length === 0) {
    return (
      <p>
        No equipment yet. POST one to <code>/api/equipment</code>.
      </p>
    );
  }

  return (
    <ul>
      {equipment.map((item) => (
        <li key={item.id} className="flex justify-between border-b border-stone-700 py-1">
          {item.name}
          {item.manufacturer ? ` — ${item.manufacturer}` : ""}
          <form action={deleteEquipmentAction.bind(null, item.id)}>
            <button type="submit" className="bg-red-800 text-white px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
