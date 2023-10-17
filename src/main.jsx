import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Pages from './pages/Pages.jsx';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeParams from './theme.js';
//import { config } from './lib/auth0/index.js'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter , useNavigate} from "react-router-dom";
import env from './config/env.js';

const Auth0ProviderWithNavigate = ({ children }) => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <Auth0Provider
      domain={ env.auth0.domain}
      clientId={env.auth0.clientId}
      authorizationParams={{ redirect_uri: env.auth0.redirectUri }}
      onRedirectCallback={(appState) => navigate(appState?.returnTo || window.location.pathname)}
    > {children}
    </Auth0Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Auth0ProviderWithNavigate>
        <Provider store={store}>
          <ThemeProvider theme={createTheme(themeParams)}>
            <Pages />
          </ThemeProvider>
        </Provider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
)
