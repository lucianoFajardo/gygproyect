import Image from "next/image";
import Dashboard_page from "./dashboard/page";
import Navbar_component from "./components/Navbar_component";

export default function Home() {
  return (
    <>
      <main>
      <Navbar_component/>
        <Dashboard_page />
      </main>
    </>

  );
}
