import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import ProtectedRoute from "./components/ProtectedRoute";
import PostPreview from "./pages/PostPreview";
import { useEffect } from "react";
import { initGA, trackPageView } from "./utils/gtag";

const GATracker = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView({ page_path: location.pathname });
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <>
      <Router>
        <GATracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/create/preview"
            element={
              <ProtectedRoute>
                <PostPreview />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
