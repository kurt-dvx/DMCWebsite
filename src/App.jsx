import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VotingPage from "./pages/VotingPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;