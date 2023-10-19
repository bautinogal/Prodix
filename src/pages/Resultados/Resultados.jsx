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
        <Grid   
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="center">
            <img src={logo4} alt="" style={{  height: '6em', margin:'2em' }} />
            <Typography style={{fontWeight:'900',fontSize:'6vh'}} variant="h4" gutterBottom component="div">{`Resultados`}</Typography>
            <Typography variant="p" gutterBottom component="div">{`Total de predicciones 1324 personas`}</Typography>
            <Grid container spacing={2} padding={'2em'} style={{marginTop:'1em'}} >
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #f6aef8',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}} />
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}}   />
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}}   />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`86%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#f6aef8',fontSize:'3vh'}}  align='center'/>
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`12%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#47D3E5',fontSize:'3vh'}}  align='center'/>
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`5%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#47D3E5',fontSize:'3vh'}}  align='center'/>
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}}   />
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}}   />
                <Grid item xs={4} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} style={{display: 'flex',justifyContent:'center'}}   />
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`86%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#47D3E5',fontSize:'3vh'}}  align='center'/>
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`12%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#47D3E5',fontSize:'3vh'}}  align='center'/>
                <Grid item xs={4} children={<Typography variant="p" gutterBottom component="div">{`5%`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',color:'#47D3E5',fontSize:'3vh'}}  align='center'/>
            </Grid>
            <Typography style={{fontWeight:'600',margin:'1em'}} align='center' variant="h5" gutterBottom component="div"><div>Creen que <span style={{color:'#f6aef8'}}>Massa</span> gana en primera vuelta</div></Typography>
            
            <Grid container
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            style={{backgroundColor:'#f5f5f5', padding:'3em',marginTop:'4em'}}>
            <Typography style={{fontWeight:'900',color:'#47D3E5',fontSize:'10vh'}}  gutterBottom component="div">{`87%`}</Typography>
            <Typography style={{fontWeight:'600'}} variant="h5" align='center' gutterBottom component="div">{`Creen que hay ballotage`}</Typography>
            </Grid>
            <Typography style={{marginTop:'2em',fontWeight:'600',fontSize:'5vh'}} gutterBottom component="div">{`32%`}</Typography>
            <Grid container
            direction="row"
            justifyContent="flex-end"
            alignItems="center">
            <Grid style={{display:'flex',justifyContent:'flex-end'}} item xs={5} children={<Avatar style={{border:'solid 4px #f6aef8',width:'5em',height:'5em'}} src={''} />} />
            <Grid item xs={2} children={<Typography variant="p" gutterBottom component="div">{`vs`}</Typography>} style={{display: 'flex',justifyContent:'center',fontWeight:'900',fontSize:'3vh'}}  align='center'/>
            <Grid style={{display:'flex',justifyContent:'flex-start'}} item xs={5} children={<Avatar style={{border:'solid 4px #47D3E5',width:'5em',height:'5em'}} src={''} />} /> 
            </Grid>
            <Typography style={{fontWeight:'600',margin:'1em'}} align='center' variant="h5" gutterBottom component="div"><div>Creen que hay ballotage entre<span style={{color:'#f6aef8'}}> Massa</span> y<span style={{color:'#47D3E5'}}> Milei</span></div></Typography>

            <Typography style={{fontWeight:'900',fontSize:'5vh',margin:'0.5em',marginTop:'2em'}} align='center' variant="h4" gutterBottom component="div">{`¿Qué predicen los argentinos?`}</Typography>

            <Tabs style={{marginTop:'2em'}} value={tab} onChange={(e, v) => setTab(v)}>
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
            <Button variant="contained" onClick={() => navigate('/votacion')} className="mainbtn button bold wide" style={{borderRadius:'4em',marginTop:'5em'}}>EDITAR MI PRODE</Button>
            <Button variant="contained" onClick={() => navigate('#')} className="mainbtn button bold wide" style={{borderRadius:'4em',marginBottom:'5em',marginTop:'1em'}}>COMPARTIR</Button>
        </Grid>
    </div>

    )
}

export default Resultados