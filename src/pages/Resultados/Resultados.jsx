import { Avatar, Backdrop, Box, Button, CircularProgress, Grid, Slider, Typography, IconButton, Input, Tab, Tabs, Container } from '@mui/material';
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
import '../styles/main.css';
import '../styles/fontawesome-all.min.css';
import '../styles/noscript.css';
import '../styles/animate.css';
import LoadingModal from '../../components/LoadingModal.jsx';

const Resultados = (props) => {
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [votacion, setVotacion] = useState([]);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        getAccessTokenSilently()
            .then(accessToken => axios.get(`${env.backendUrl}/votaciones`, { headers: { 'Authorization': `Bearer ${accessToken}` } }))
            .then(r => setVotacion(r.data))
            .catch(setVotacion([]));
    }, []);

    const navigate = useNavigate();
    const results = votacion.map(x => x.votacion).flat().reduce((p, x) => {
        p[x.lastName] ??= { name: x.name, lastName: x.lastName, logoURL: x.logoURL, profileURL: x.profileURL, votes: [] };
        p[x.lastName].votes.push({ value: x.value, ballotage: x.ballotage, firstRoundWinner: x.firstRoundWinner, ballotageWinner: x.ballotageWinner })
        return p;
    }, {})
    console.log(votacion);
    console.log(results);
    const perGanadorPrimera = (candidato) => votacion.length > 0 ? results[candidato]?.votes.filter(x => x.firstRoundWinner).length / votacion.length * 100 : 0;
    const ganadorPrimera = Object.values(results)
        .sort((a, b) => - a.votes.filter(x => x.firstRoundWinner).length + b.votes.filter(x => x.firstRoundWinner).length)[0]?.lastName;
    const perBallo = votacion?.length > 0 ? votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).length / votacion?.length * 100 : 0;
    const balloCandPer = votacion?.length > 0 ? Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
        const finalistas = x.filter(x => x.ballotage);
        if (finalistas.length === 2) {
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
        }
        return p;
    }, {})).sort((a, b) => a[1] - a[b])[0][1] /  votacion.length * 100: {}; 
    const balloCand = votacion?.length > 0 ? Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
        const finalistas = x.filter(x => x.ballotage);
        if (finalistas.length === 2) {
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
        }
        return p;
    }, {})).sort((a, b) => a[1] - a[b])[0][0].split('-') : {};

    console.log(balloCand)
    return (<div>
        {votacion.length === 0 ? <LoadingModal /> : null}
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center">
            <img src={logo4} alt="" style={{ height: '6em', margin: '2em' }} />
            <Typography style={{ fontWeight: '900', fontSize: '6vh' }} variant="h4" gutterBottom component="div">{`Resultados`}</Typography>
            <Typography variant="p" gutterBottom component="div">{`Total de predicciones ${votacion.length} personas`}</Typography>
            <Grid container spacing={2} padding={'2em'} style={{ marginTop: '1em' }} >
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Massa?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bullrich?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Milei?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Massa')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bullrich')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Milei')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Schiaretti?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bregman?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Blanco' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={''} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Schiaretti')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bregman')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Blanco')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Blanco' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
            </Grid>
            <Typography style={{ fontWeight: '600', margin: '1em' }} align='center' variant="h5" gutterBottom component="div"><div>Creen que <span style={{ color: '#f6aef8' }}>{ganadorPrimera}</span> gana en primera vuelta</div></Typography>

            <Grid container
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
                style={{ backgroundColor: '#f5f5f5', padding: '3em', marginTop: '4em' }}>
                <Typography style={{ fontWeight: '900', color: '#47D3E5', fontSize: '10vh' }} gutterBottom component="div">{`${perBallo}%`}</Typography>
                <Typography style={{ fontWeight: '600' }} variant="h5" align='center' gutterBottom component="div">{`Creen que hay ballotage`}</Typography>
            </Grid>
            <Typography style={{ marginTop: '2em', fontWeight: '600', fontSize: '5vh' }} gutterBottom component="div">{`${balloCandPer}%`}</Typography>
            <Grid container
                direction="row"
                justifyContent="flex-end"
                alignItems="center">
                <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={5} children={<Avatar style={{ border: 'solid 4px #f6aef8', width: '5em', height: '5em' }} src={results?.[balloCand[0]]?.profileURL} />} />
                <Grid item xs={2} children={<Typography variant="p" gutterBottom component="div">{`vs`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', fontSize: '3vh' }} align='center' />
                <Grid style={{ display: 'flex', justifyContent: 'flex-start' }} item xs={5} children={<Avatar style={{ border: 'solid 4px #47D3E5', width: '5em', height: '5em' }} src={results?.[balloCand[1]]?.profileURL} />} />
            </Grid>
            <Typography style={{ fontWeight: '600', margin: '1em' }} align='center' variant="h5" gutterBottom component="div"><div>Creen que hay ballotage entre<span style={{ color: '#f6aef8' }}> {balloCand[0]}</span> y<span style={{ color: '#47D3E5' }}> {balloCand[1]}</span></div></Typography>

            <Typography style={{ fontWeight: '900', fontSize: '5vh', margin: '0.5em', marginTop: '2em' }} align='center' variant="h4" gutterBottom component="div">{`¿Qué predicen los argentinos?`}</Typography>

            <Tabs style={{ marginTop: '2em' }} value={tab} onChange={(e, v) => setTab(v)}>
                <Tab label="Primera Vuelta" value={0} />
                <Tab label="Ballotage" value={1} />
            </Tabs>
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
            <Button variant="contained" onClick={() => navigate('/votacion')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginTop: '5em' }}>EDITAR MI PRODE</Button>
            <Button variant="contained" onClick={() => navigate('#')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginBottom: '5em', marginTop: '1em' }}>COMPARTIR</Button>
        </Grid>
    </div>

    )
}

export default Resultados