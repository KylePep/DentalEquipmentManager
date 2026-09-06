import { CreateMaintenanceEventAction } from "@/app/actions";
import { useState } from "react";

interface CreateEventProps {
  equipmentId: number;
  onSaved: () => void;
}

export function CreateMaintenanceEvent({ equipmentId, onSaved }: CreateEventProps) {
  const [reoccurring, setReoccurring] = useState(false);
  const [pending, setPending] = useState(false);

  const handleReoccur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReoccurring(e.target.checked);
  };

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
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
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
        <label htmlFor="start">Start:</label>
        <input
          id="start"
          name="start"
          type="date"
          required
          maxLength={120}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="end">End:</label>
        <input
          id="end"
          name="end"
          type="date"
          required
          maxLength={120}
          className="bg-stone-900 text-white placeholder:text-gray-500 rounded px-1" />
      </div>

      <div className="flex flex-col items-start gap-1">
        <label htmlFor="reoccur">Reoccur:</label>
        <input
          id="reoccur"
          name="reoccur"
          type="checkbox"
          defaultChecked={reoccurring}
          onChange={handleReoccur}
        />
      </div>

      {reoccurring && (
        <div className="flex flex-col gap-1">
          <label htmlFor="occurrence">Occurrence:</label>
          <select name="occurrence" id="occurrence">
            <option value="weekly">weekly</option>
            <option value="monthly">monthly - day</option>
            <option value="monthly">monthly - date</option>
            <option value="yearly">yearly</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-bold bg-blue-800 rounded p-2 hover:bg-blue-900 duration-300 ease-in-out">
        {pending ? "Saving..." : "Create Event"}
      </button>
    </form>
  )
}