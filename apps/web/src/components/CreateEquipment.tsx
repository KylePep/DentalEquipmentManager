import { createEquipmentAction } from "@/app/actions";


export function CreateEquipment() {

  return (
    <form action={createEquipmentAction} className="flex flex-col gap-2 p-4">
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" />
      <label htmlFor="manufacturer">Manufacturer:</label>
      <input id="manufacturer" name="manufacturer" type="text" />
      <button type="submit" className="bg-blue-900 rounded p-2">Create Equipment</button>
    </form>
  );
}