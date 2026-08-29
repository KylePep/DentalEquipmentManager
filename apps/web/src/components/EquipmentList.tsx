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
        <li key={item.id}>
          {item.name}
          {item.manufacturer ? ` — ${item.manufacturer}` : ""}
        </li>
      ))}
    </ul>
  );
}
