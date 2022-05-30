import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Stats from "./views/Stats";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col items-center justify-center bg-tornado-dark text-center font-mono text-white selection:bg-green-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="stats" element={<Stats />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
