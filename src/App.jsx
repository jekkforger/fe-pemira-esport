import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Voting from "./pages/Voting";
import ThankYou from "./pages/ThankYou";
import Gallery from "./pages/Gallery";

// ADMIN IMPORT YANG BENAR
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import KandidatList from "./pages/admin/KandidatList";
import KandidatForm from "./pages/admin/KandidatForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Halaman User */}
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Voting />} />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Halaman Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/kandidat" element={<KandidatList />} />
        <Route path="/admin/kandidat/tambah" element={<KandidatForm />} />

      </Routes>
    </BrowserRouter>
  );
}
