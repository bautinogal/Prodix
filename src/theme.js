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
            primary: {
                main: '#83d67d', //Verde Elidia
                //main: '#5c8cbb', //Azul Std
            },
            success: {
                main: '#76b767'
            },
            danger: {
                main: '#b75d5d'
            },
            secondary: {
                main: '#9e9e9e',
                light: '#e0e0e0',
                dark: '#616161',
            }
        },

    }
};