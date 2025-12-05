import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LuxuryInteriorDesignHomepage from "./pages/Homepage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LuxuryInteriorDesignHomepage />} />
      </Routes>
    </>
  );
}

export default App;
