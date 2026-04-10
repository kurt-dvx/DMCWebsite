import { useState, useEffect } from "react";
// 🔥 Firebase imports (uncomment when ready)
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";

const VotingPage = () => {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [registeredIds, setRegisteredIds] = useState([]);
  const [loadingIds, setLoadingIds] = useState(true);

  // 📁 Load local JSON (active)
  useEffect(() => {
    const loadRegisteredIds = async () => {
      try {
        const response = await fetch("/registered_students.json");
        if (!response.ok) throw new Error("JSON file not found");
        const data = await response.json();
        const ids = Array.isArray(data) ? data : data.studentIds || [];
        setRegisteredIds(ids.map(id => String(id).trim()));
      } catch (err) {
        console.warn("Using fallback list:", err);
        setRegisteredIds(["816012345", "820123456", "817654321", "819000111"]);
      } finally {
        setLoadingIds(false);
      }
    };
    loadRegisteredIds();
  }, []);

  // ✅ Local JSON check (active)
  const checkRegistration = () => {
    const id = studentId.trim();
    if (!id) {
      setErrorMsg("Please enter a student ID.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    setTimeout(() => {
      if (registeredIds.includes(id)) {
        setStatus("registered");
      } else {
        setStatus("not-registered");
      }
    }, 300);
  };

  /*
  // 🔥 FIREBASE VERSION – uncomment and comment out the local check above
  const checkRegistration = async () => {
    const id = studentId.trim();
    if (!id) {
      setErrorMsg("Please enter a student ID.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStatus("registered");
      } else {
        setStatus("not-registered");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Failed to check registration. Try again.");
    }
  };
  */

  const handleKeyPress = (e) => {
    if (e.key === "Enter") checkRegistration();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 p-4">
      <div className="frosted-glass max-w-md w-full text-white p-8">
        <h2 className="text-3xl font-bold text-center mb-2">🗳️ Voter Check</h2>
        <p className="text-center text-white/80 mb-6">Enter your UWI Student ID</p>

        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g. 816012345"
          className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
          disabled={loadingIds}
        />

        <button
          onClick={checkRegistration}
          disabled={status === "loading" || loadingIds}
          className="btn-magenta w-full !py-3 disabled:opacity-50"
        >
          {status === "loading" ? "Checking..." : loadingIds ? "Loading registry..." : "Check"}
        </button>

        {status === "loading" && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
          </div>
        )}

        {status === "registered" && (
          <div className="mt-6 bg-green-500/20 border border-green-400 text-green-200 px-4 py-3 rounded-full text-center">
            ✅ You're registered! Eligible to vote.
          </div>
        )}

        {status === "not-registered" && (
          <div className="mt-6 bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-full text-center">
            ❌ ID not found in registry.
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 text-center text-red-300">{errorMsg}</div>
        )}

        <p className="text-xs text-white/50 text-center mt-8">
          {loadingIds ? "Loading registry..." : `Registry loaded: ${registeredIds.length} IDs (JSON)`}
        </p>
      </div>
    </div>
  );
};

export default VotingPage;