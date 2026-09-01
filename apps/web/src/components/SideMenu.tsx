export function SideMenu() {
  return (
    <div className="h-full flex flex-col justify-between bg-stone-900 w-32 py-4 px-2">
      <section className="flex flex-col gap-2">
        <button className="bg-yellow-600 px-2 rounded-xs hover:bg-yellow-950">Text</button>
        <button className="bg-red-600 px-2 rounded-xs hover:bg-red-950">Text</button>
        <button className="bg-blue-600 px-2 rounded-xs hover:bg-blue-950">Text</button>
        <button className="bg-green-600 px-2 rounded-xs hover:bg-green-950">Text</button>
      </section>

      <section className="flex flex-col">
        <button className="bg-stone-600 px-2 rounded-xs hover:bg-stone-950">Text</button>
      </section>
    </div>
  )
}