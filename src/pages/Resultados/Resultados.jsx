import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import { AreaChart, Area, BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { useNavigate } from 'react-router-dom';
import data from '../data.js';

const Resultados = (props) => {
    const navigate = useNavigate();
    const results = data
        .filter(x => !x.autoAdjust)
        .map(x => ({ ...x, primeraVuelta: Math.round(Math.random() * 30), segundaVuelta: Math.round(Math.random() * 100) }));

    return (
        <div style={{ padding: '2.5%', width: "95%", height: "60vh" }}>
            <Typography variant="h6" gutterBottom component="div">{`Lo que votaron otras personas`} </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart  layout="vertical" width={'100%'}  height={'60vh'} data={results} margin={{ top: 20, right: 20, bottom: 20, left: 20, }} >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="lastName" type="category" scale="band" />
                    <Tooltip />
                    <Legend />
                    {/* <Area dataKey="primeraVuelta" fill="#8884d8" stroke="#8884d8" /> */}
                    <Bar dataKey="primeraVuelta" barSize={20} fill="#71ddf7" label='Primera Vuelta'/>
                    <Bar dataKey="segundaVuelta" barSize={20} fill="#F6AEF8" label='Ballotage'/>
                </ComposedChart>
            </ResponsiveContainer>
            <Button variant="contained" onClick={() => navigate('/votacion')}className='botton-guardar botton-text'>Volver</Button>
        </div>

    )
}

export default Resultados