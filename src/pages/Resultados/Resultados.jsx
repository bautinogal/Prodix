import { Avatar, Backdrop, Box, Button, CircularProgress, Grid, Slider, Typography, IconButton, Input, Tab, Tabs } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import { AreaChart, Area, BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { DataGrid, GridToolbar, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import env from '../../config/env.js';
import { useRef, useState, useMemo, useEffect } from 'react';
import data from '../data.js';
import axios from 'axios';
import logo4 from '../img/logo4.png';

const Resultados = (props) => {
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [votacion, setVotacion] = useState();
    const [tab, setTab] = useState(0);

    useEffect(() => {
        getAccessTokenSilently()
            .then(accessToken => axios.get(`${env.backendUrl}/votaciones`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
            .then(r => setVotacion(r.data))
            .catch(setVotacion([]));
    }, []);

    const navigate = useNavigate();
    const results = data
        .filter(x => !x.autoAdjust)
        .map(x => ({ ...x, primeraVuelta: Math.round(Math.random() * 30), segundaVuelta: Math.round(Math.random() * 100) }));

    return (<div>
        <img src={logo4} alt="" style={{  height: '3em' }} />
        <Typography variant="h4" gutterBottom component="div">{`Resultados`}</Typography>
        <Typography variant="p" gutterBottom component="div">{`Total de predicciones 1324 personas`}</Typography>
        <Grid container spacing={2} padding={'1em'}>
            <Grid item xs={4} children={<Avatar src={''} />} />
            <Grid item xs={4} children={<Avatar src={''} />} />
            <Grid item xs={4} children={<Avatar src={''} />} />
            <Grid item xs={4} children={<Avatar src={''} />} />
            <Grid item xs={4} children={<Avatar src={''} />} />
            <Grid item xs={4} children={<Avatar src={''} />} />
        </Grid>
        <Typography variant="p" gutterBottom component="div">{`Creen que Massa gana en primera vuelta`}</Typography>
        
        <Typography variant="h2" gutterBottom component="div">{`87%`}</Typography>
        <Typography variant="p" gutterBottom component="div">{`Creen que hay ballotage`}</Typography>

        <Typography variant="h2" gutterBottom component="div">{`32%`}</Typography>
        <Typography variant="p" gutterBottom component="div">{`Creen que hay ballotage`}</Typography>

        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Primera Vuelta" value={0} />
            <Tab label="Ballotage" value={1} />
        </Tabs>
        <Typography variant="h6" gutterBottom component="div">{`Lo que votaron otras personas`} </Typography>
        {/* <ResponsiveContainer width="100%" height="100%">
                <ComposedChart layout="vertical" width={'100%'} height={'60vh'} data={results} margin={{ top: 20, right: 20, bottom: 20, left: 20, }} >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="lastName" type="category" scale="band" />
                    <Tooltip />
                    <Legend />
                     <Area dataKey="primeraVuelta" fill="#8884d8" stroke="#8884d8" />  
                    <Bar dataKey="primeraVuelta" barSize={20} fill="#71ddf7" label='Primera Vuelta' />
                    <Bar dataKey="segundaVuelta" barSize={20} fill="#F6AEF8" label='Ballotage' />
                </ComposedChart>
            </ResponsiveContainer> */}
        <Button variant="contained" onClick={() => navigate('/votacion')} className='botton-guardar botton-text'>Volver</Button>
    </div>

    )
}

export default Resultados