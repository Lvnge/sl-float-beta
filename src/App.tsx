import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Charts from "./components/charts/Charts";
import Account from "./components/account/Account";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after auth state is resolved
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-800 text-zinc-200 font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes: use a layout with nested routes */}
        {user ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/account" element={<Account />} />
          </Route>
        ) : (
          // Redirect to Login or render <Login /> if the user is not authenticated
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
