import { CreateMaintenanceEventAction } from "@/app/actions";
import { useState } from "react";

interface CreateEventProps {
  equipmentId: number;
  onSaved: () => void;
}

export function CreateMaintenanceEvent({ equipmentId, onSaved }: CreateEventProps) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    formData.set("equipmentId", equipmentId.toString());
    await CreateMaintenanceEventAction(formData);
    setPending(false);
    onSaved();
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 p-4 bg-stone-800 rounded max-w-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={120}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          cols={50}
          maxLength={1200}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1 resize-none" >
        </textarea>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          maxLength={120}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="font-bold bg-blue-800 rounded p-2 hover:bg-blue-900 duration-300 ease-in-out">
        {pending ? "Saving..." : "Save changes"}
      </button>
    </form>
  )
}