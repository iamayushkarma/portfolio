import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Mainlayout() {
  return (
    <>
      <Navbar />
      <main className="pt-14 md:pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Mainlayout;
