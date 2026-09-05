import { SideMenu } from "@/components/Layout/SideMenu";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-row w-full min-h-0 flex-grow">
      <SideMenu />
      {children}
    </div>
  );
}