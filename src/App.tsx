import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/login";
import AuthGuard from "./guard/auth.guard";
import Header from "./components/layout/header/header";
import Sidebar from "./components/layout/sidebar/sidebar";
import Footer from "./components/layout/footer/footer";
import Dashboard from "./components/Dashboard/dashboard";
import Projects from "./components/Project/projects";
import "./App.css";
import ProjectDetail from "./pages/Project-Detail/project-detail.page";
import ProjectFiles from "./components/Project-Files/project-files";

// Layout for protected pages
const ProtectedLayout = () => {
  return (
    <div className="app_layout">
      <Header />

      <div className="app_body">
        <Sidebar />

        <main className="app_content">
          <Routes>
            <Route element={<AuthGuard />}>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route
                path="/projects/:projectId/files"
                element={<ProjectFiles />}
              />
            </Route>
          </Routes>
        </main>
      </div>

      {/* Footer on bottom */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public — no sidebar, no header */}
      <Route path="/login" element={<Login />} />

      <Route path="/*" element={<ProtectedLayout />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
