import env from '../../config/env.js';
import history from "../utils/history.js";
//import { useNavigate } from "react-router-dom";
// domain="{yourDomain}"
//     clientId="{yourClientId}"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}

const navigate = useNavigate();
export const config = {
    domain: env.auth0.domain,
    clientId: env.auth0.clientId,
    //onRedirectCallback: appState => navigate(appState?.returnTo || window.location.pathname),
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: env.auth0.audience,
    },
};