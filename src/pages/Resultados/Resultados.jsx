import {
    Avatar, Backdrop, Box, Button, CircularProgress, Grid, Slider, Typography, IconButton, Input, Tab, Tabs, Container,
    List, ListItem, ListItemText, ListSubheader, TextField, Paper, InputBase, Divider
} from '@mui/material';
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
    const [filter, setFilter] = useState('');

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

    const perGanadorPrimera = (candidato) => (votacion.length > 0 ? results[candidato]?.votes.filter(x => x.firstRoundWinner).length / votacion.length * 100 : 0).toFixed(2);
    const ganadorPrimera = Object.values(results)
        .sort((a, b) => - a.votes.filter(x => x.firstRoundWinner).length + b.votes.filter(x => x.firstRoundWinner).length)[0]?.lastName;
    const perBallo = (votacion?.length > 0 ? votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).length / votacion?.length * 100 : 0).toFixed(2);
    const balloCandPer = votacion?.length > 0 ? (Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
        const finalistas = x.filter(x => x.ballotage);
        if (finalistas.length === 2) {
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
        }
        return p;
    }, {})).sort((a, b) => a[1] - a[b])[0][1] / votacion.length * 100).toFixed(2) : {};
    const balloCand = votacion?.length > 0 ? Object.entries(votacion.map(x => x.votacion).filter(x => x.find(x => x.ballotage)).reduce((p, x) => {
        const finalistas = x.filter(x => x.ballotage);
        if (finalistas.length === 2) {
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] ??= 0;
            p[finalistas[0].lastName + '-' + finalistas[1].lastName] += 1;
        }
        return p;
    }, {})).sort((a, b) => a[1] - a[b])[0][0].split('-') : {};

    return (<div>
        {votacion.length === 0 ? <LoadingModal /> : null}
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center">
            <img src={logo4} alt="" style={{ height: '6em', margin: '2em' }} />
            <Typography style={{ fontWeight: '900', fontSize: '6vh' }} variant="h4" gutterBottom component="div">{`Resultados`}</Typography>
            {/* <Typography variant="p" gutterBottom component="div">{`Total de predicciones ${votacion.length} personas`}</Typography> */}
            <Grid container spacing={2} padding={'2em'} style={{ marginTop: '1em' }} >
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Massa?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bullrich?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Milei?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Massa')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Massa' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bullrich')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bullrich' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Milei')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Milei' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Bregman?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={results?.Schiaretti?.profileURL} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Avatar style={{ border: 'solid 4px ' + (ganadorPrimera === 'Blanco' ? '#f6aef8' : '#47D3E5'), width: '5em', height: '5em' }} src={''} />} style={{ display: 'flex', justifyContent: 'center' }} />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Bregman')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Bregman' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`${perGanadorPrimera('Schiaretti')}%`}</Typography>} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900', color: ganadorPrimera === 'Schiaretti' ? '#f6aef8' : '#47D3E5', fontSize: '3vh' }} align='center' />
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
            <List sx={{ marginTop: '2em', width: '100%', maxWidth: 800, bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 1000, '& ul': { padding: 0 }, }} subheader={<li />} >
                <li>
                    <ul>
                        <ListSubheader>
                            <Grid container>
                                <Grid item xs={3} > <InputBase value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar" style={{ height: '1.2em', m: '.5em' }} /> </Grid>
                                <Grid item xs={.3} > </Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Massa?.profileURL} /></Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Bullrich?.profileURL} /></Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Milei?.profileURL} /></Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Schiaretti?.profileURL} /></Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Bregman?.profileURL} /></Grid>
                                <Grid item xs={1.45} ><Avatar style={{ width: '1.8em', height: '1.8em' }} src={results?.Blanco?.profileURL} /></Grid>
                            </Grid>
                        </ListSubheader>
                        {votacion.map((vot, i) => {
                            let a = [0, 1, 2, 3, 4, 5]
                            let arr = tab === 0 ? a.map(i => vot?.votacion[i]?.value) : a.map(i => vot?.votacion[i]?.ballotage);
                            if (filter !== '' && !vot.alias.toLowerCase().includes(filter.toLowerCase())) return null;
                            return (<ListItem key={vot.sub}>
                                <Grid container spacing={0} height={'1em'} sx={{ backgroundColor: (i % 2 ? '#ededed' : '##dcdcdc') }}>
                                    <Grid item xs={3.3} height={'1em'} ><Typography fontSize={'.75em'} fontWeight={600} style={{ whiteSpace: 'nowrap', overflow: 'hidden', 'text-overflow': 'ellipsis' }}>{vot.alias} </Typography></Grid>
                                    {arr.map(i => <Grid item xs={1.45} height={'1em'} fontSize={'.75em'} fontWeight={500}>{i ?? '-'}</Grid>)}
                                </Grid>
                            </ListItem>)
                        })}
                    </ul>
                </li>
            </List>
            <Button variant="contained" onClick={() => navigate('/votacion')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginTop: '5em' }}>EDITAR MI PRODE</Button>
            <Button variant="contained" onClick={() => navigate('#')} className="mainbtn button bold wide" style={{ borderRadius: '4em', marginBottom: '5em', marginTop: '1em' }}>COMPARTIR</Button>
        </Grid>
    </div >

    )
}

export default Resultados