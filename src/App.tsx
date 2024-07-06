import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/home";
import AboutPage from "./pages/about";
import ErrorPage from "./exclusive/error-page";
import VerySadPage from "./pages/very-sad";
import MplsTwibbonPage from "./exclusive/mpls_twibbon";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Homepage />} errorElement={<ErrorPage />} />
        <Route path={'/about'} element={<AboutPage />} errorElement={<ErrorPage />} />
        <Route path={'/mpls_twibbon/:name_hash'} element={<MplsTwibbonPage />} errorElement={<ErrorPage />} />
        <Route path={'/very-sad/:message_hash'} element={<VerySadPage />} errorElement={<ErrorPage />} />
        <Route path={'*'} element={<ErrorPage />} errorElement={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App;
