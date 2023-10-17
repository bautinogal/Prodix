import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';

export default {
    ...esES,
    ...{
        typography: {
            "fontFamily": `"Montserrat", sans-serif`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        },
        palette: {
            contrastThreshold: 3,
            primary: {
                main: '#71ddf7', //Celeste
                dark: '#4AD0F0',
                light: '#9EE9FB',
                contrastText: '#fff',
            },
            secondary: {
                main: '#F6AEF8', //Rosa
                dark: '#E880EC',
                light: '#FDE3FE',
                contrastText: '#fff',
            },
            success: {
                main: '#82FB6F',
                dark: '#5FF847',
                light: '#AAFD9D',
                contrastText: '#fff',
            },
            danger: {
                main: '#FE707B',
                dark: '#FE4956',
                light: '#FF9EA5',
                contrastText: '#fff',
            },
            info: {
                main: '#71DEF7',
                dark: '#4AD0F0',
                light: '#4AD0F0',
                contrastText: '#fff',
            }
        },

    }
};