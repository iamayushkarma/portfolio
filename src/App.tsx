import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./components/layout/Mainlayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

const App = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      document.body.style.backgroundPosition = `${moveX}px ${moveY}px, ${moveX}px ${moveY}px, ${moveX}px ${moveY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route element={<Mainlayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
