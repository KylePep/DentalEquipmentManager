import { SideMenu } from "@/components/SideMenu";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="flex flex-row w-full">
        <SideMenu />
        {children}
      </main>
    </>
  );
}