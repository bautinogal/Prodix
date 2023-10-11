//------------------------------- Enviroment Variables ----------------------------------
export default {
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    auth0: {
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    }
}