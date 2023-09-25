import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "../lib/utils/history.js";
import Landing from './Landing/Landing.jsx';
import Votacion from './Votacion/Votacion.jsx';
import Resultados from './Resultados/Resultados.jsx';

export default function Main() {
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    return (<Router history={history}>
        <div id="app" className="d-flex flex-column h-100">
            <Routes>
                <Route exact path="/" element={<Landing/>} />
                <Route exact path="/votacion" element={<Votacion/>} />
                <Route exact path="/resultados" element={<Resultados/>} />
            </Routes>
        </div>
    </Router>)
}