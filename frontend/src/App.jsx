  import { Routes, Route } from "react-router-dom";
  import { Toaster } from "react-hot-toast";
  import Homepage from "./pages/Homepage_temp.jsx";

  function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </>
    );
  }

  export default App;
