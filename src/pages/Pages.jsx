import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "../lib/utils/history.js";
import Landing from './Landing/Landing.jsx';
import Votacion from './Votacion/Votacion.jsx';
import Resultados from './Resultados/Resultados.jsx';

export default function Main() {
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return (<Routes>
        {/* <Route exact path="/resultados" element={<Resultados />} />*/}
        <Route exact path="/votacion" element={<Votacion />} />
        <Route exact path="/" element={<Landing />} />
    </Routes>)
}