import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Stats from "./views/Stats";

function App() {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <div className="flex min-h-screen flex-col items-center justify-center bg-tornado-dark text-center font-mono text-white selection:bg-green-900">
          <Routes key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="stats" element={<Stats />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
