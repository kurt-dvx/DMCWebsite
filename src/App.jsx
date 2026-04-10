import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VotingPage from "./pages/VotingPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import AnalyticsTracker from "./components/AnalyticsTracker";

function App() {
  return (
    <Router>
      <AnalyticsTracker /> { }
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;