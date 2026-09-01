import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SideMenu } from "@/components/SideMenu";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="flex flex-row flex-grow">
        <SideMenu />
        {children}
      </main>
    </>
  );
}