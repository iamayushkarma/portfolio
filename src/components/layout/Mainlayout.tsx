import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Mainlayout() {
  return (
    <>
      <div className="sticky top-0 w-full z-[99999] bg-white border-b-2">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Mainlayout;
