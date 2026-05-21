import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./components/layout/Mainlayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
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
