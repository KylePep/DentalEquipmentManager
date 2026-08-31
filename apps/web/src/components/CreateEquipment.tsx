import { createEquipmentAction } from "@/app/actions";


export function CreateEquipment() {

  return (
    <form action={createEquipmentAction} className="flex flex-col gap-2 p-4 bg-stone-800 rounded max-w-xl">
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" maxLength={120} className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-2" />
      <label htmlFor="manufacturer">Manufacturer:</label>
      <input id="manufacturer" name="manufacturer" type="text" maxLength={120} className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-2" />
      <button type="submit" className="bg-blue-900 rounded p-2">Create Equipment</button>
    </form>
  );
}