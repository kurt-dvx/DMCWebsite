import { useState, useEffect } from "react";
import { db, auth, googleProvider, signInWithPopup, signOut } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const ALLOWED_EMAILS = [
  "uwidigitalmediaclub@gmail.com",
  "president.dmc@uwi.edu",
];

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFaculty, setNewFaculty] = useState("");
  const [editingId, setEditingId] = useState(null); // track which student is being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user && ALLOWED_EMAILS.includes(user.email)) {
      loadStudents();
    }
  }, [user]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "students"));
      const list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setStudents(list.sort((a, b) => a.id.localeCompare(b.id)));
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setStudents([]);
  };

  const resetForm = () => {
    setNewId("");
    setNewName("");
    setNewEmail("");
    setNewFaculty("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newId.trim()) {
      setError("Student ID is required.");
      return;
    }
    setError("");
    setSuccess("");

    const studentData = {
      name: newName.trim() || "—",
      email: newEmail.trim() || "—",
      faculty: newFaculty.trim() || "—",
    };

    try {
      if (editingId) {
        // Update existing student (ID cannot be changed)
        await updateDoc(doc(db, "students", editingId), {
          ...studentData,
          updatedAt: new Date().toISOString(),
        });
        setSuccess(`Updated ${editingId}`);
      } else {
        // Add new student
        await setDoc(doc(db, "students", newId.trim()), {
          ...studentData,
          addedAt: new Date().toISOString(),
        });
        setSuccess(`Added ${newId}`);
      }
      resetForm();
      loadStudents();
    } catch (err) {
      console.error(err);
      if (err.code === "permission-denied") {
        setError("❌ Permission denied. Your email is not authorized.");
      } else {
        setError("Failed to save student. Please try again.");
      }
    }
  };

  const handleEdit = (student) => {
    setNewId(student.id);
    setNewName(student.name || "");
    setNewEmail(student.email || "");
    setNewFaculty(student.faculty || "");
    setEditingId(student.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete ${id}?`)) return;
    try {
      await deleteDoc(doc(db, "students", id));
      if (editingId === id) resetForm();
      setSuccess(`Deleted ${id}`);
      loadStudents();
    } catch (err) {
      console.error(err);
      if (err.code === "permission-denied") {
        setError("❌ Permission denied. Your email is not authorized to delete students.");
      } else {
        setError("Failed to delete. Please try again.");
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 p-4">
        <div className="frosted-glass max-w-md w-full text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">🔐 Admin Login</h2>
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 w-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          {error && <p className="mt-4 text-red-300">{error}</p>}
        </div>
      </div>
    );
  }

  if (!ALLOWED_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 p-4">
        <div className="frosted-glass max-w-md w-full text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">⛔ Access Denied</h2>
          <p className="mb-2">You are signed in as:</p>
          <p className="font-mono bg-white/10 p-2 rounded mb-6">{user.email}</p>
          <p className="mb-6 text-white/80">This email is not authorized to access the admin panel.</p>
          <button onClick={handleLogout} className="btn-magenta">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-800 p-4 md:p-8">
      <div className="frosted-glass max-w-6xl mx-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">📋 Student Registry</h2>
            <p className="text-sm opacity-80">Logged in as {user.email}</p>
          </div>
          <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full">
            Sign Out
          </button>
        </div>

        {/* Form with Edit capability */}
        <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap items-end justify-center gap-3">
          <input
            type="text"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            placeholder="Student ID *"
            className="flex-1 min-w-[160px] px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/50"
            required
            disabled={!!editingId}
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Full Name"
            className="flex-1 min-w-[160px] px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/50"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 min-w-[160px] px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/50"
          />
          <input
            type="text"
            value={newFaculty}
            onChange={(e) => setNewFaculty(e.target.value)}
            placeholder="Faculty (e.g. FST)"
            className="flex-1 min-w-[160px] px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/50"
          />
          <button type="submit" className="btn-magenta px-6 py-2 whitespace-nowrap">
            {editingId ? "Update Student" : "Add Student"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full whitespace-nowrap"
            >
              Cancel
            </button>
          )}
        </form>

        {error && <p className="text-red-300 mb-4">{error}</p>}
        {success && <p className="text-green-300 mb-4">{success}</p>}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/30">
                <tr>
                  <th className="py-2 px-2">Student ID</th>
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Faculty</th>
                  <th className="py-2 px-2">Added</th>
                  <th className="py-2 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center opacity-60">
                      No students registered yet.
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-2 font-mono">{s.id}</td>
                      <td className="py-3 px-2">{s.name || "—"}</td>
                      <td className="py-3 px-2">{s.email || "—"}</td>
                      <td className="py-3 px-2">{s.faculty || "—"}</td>
                      <td className="py-3 px-2 text-xs opacity-60">
                        {s.addedAt ? new Date(s.addedAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-2 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-300 hover:text-blue-100 text-xs bg-blue-500/20 hover:bg-blue-500/40 px-2 py-1 rounded-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-red-300 hover:text-red-100 text-xs bg-red-500/20 hover:bg-red-500/40 px-2 py-1 rounded-full"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;