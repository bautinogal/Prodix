import { Avatar, Backdrop, Box, Button, CircularProgress, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import { AreaChart, Area, BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { DataGrid, GridToolbar, GridRowModes, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import env from '../../config/env.js';
import { useRef, useState, useMemo, useEffect } from 'react';
import data from '../data.js';
import axios from 'axios';

const Resultados = (props) => {
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [votacion, setVotacion] = useState();

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

    return (
        <div style={{ padding: '2.5%', width: "95%", height: "60vh" }}>
            <Backdrop open={votacion == null} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <CircularProgress color="inherit" />
            </Backdrop>
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

            <DataGrid
                {...{
                    sx: { backgroundColor: 'white', marginTop: '1em' },
                    autoHeight: true,
                }}
                getRowId={r => r.sub}
                rows={votacion || []}
                columns={[
                    { field: 'picture', headerName: '', flex: 10, renderCell: (params) => <Avatar src={params.value} /> },
                    { field: 'name', headerName: '', flex: 100 },
                    ...data.filter(x => !x.autoAdjust).map(d => ({
                        field: d.lastName, headerName: d.lastName, flex: 100,
                        renderCell: (params) => (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Grid container spacing={2} padding={'0px'}>
                                <Grid item xs={6}>
                                    <Typography color={'#4AD0F0'} gutterBottom component="div">{Math.round(Math.random() * 30)}%</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography color={'#E880EC'}  gutterBottom component="div">{Math.round(Math.random() * 30)}%</Typography>
                                </Grid>
                            </Grid>
                        </div>)
                    }))
                ]} />
            <Button variant="contained" onClick={() => navigate('/votacion')} className='botton-guardar botton-text'>Volver</Button>
        </div>

    )
}

export default Resultados