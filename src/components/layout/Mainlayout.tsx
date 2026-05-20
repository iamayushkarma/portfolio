import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Mainlayout() {
  return (
    <>
      <div className="flex items-center sm:justify-center sm:p-1 bg-white border-b-2">
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
