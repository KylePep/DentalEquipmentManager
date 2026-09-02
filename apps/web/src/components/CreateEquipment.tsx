import { createEquipmentAction } from "@/app/actions";


export function CreateEquipment() {

  return (
    <form action={createEquipmentAction} className="flex flex-col gap-4 p-4 bg-stone-800 rounded max-w-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" maxLength={120} className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input id="manufacturer" name="manufacturer" type="text" maxLength={120} className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <button type="submit" className="font-bold bg-blue-800 rounded p-2 hover:bg-blue-900 duration-300 ease-in-out">Create Equipment</button>
    </form>
  );
}