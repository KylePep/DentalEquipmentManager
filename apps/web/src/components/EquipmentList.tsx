import { deleteEquipmentAction } from "@/app/actions";
import type { Equipment } from "@/lib/api";

const equipmentColumns: Record<string, keyof Equipment> = {
  'Name': 'name',
  'Manufacturer': 'manufacturer',
  'Purchase Date': 'purchaseDate',
};

export function EquipmentList({ equipment }: { equipment: Equipment[] }) {
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
                    <button className="bg-yellow-800 text-white py-0 px-1 rounded text-xs hover:bg-yellow-950 hover:cursor-pointer duration-300 ease-in-out">Edit</button>
                  </div>
                  <form action={deleteEquipmentAction.bind(null, item.id)}>
                    <button type="submit" className="bg-red-800 text-white px-1 rounded text-xs hover:bg-red-950 hover:cursor-pointer duration-300 ease-in-out">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
