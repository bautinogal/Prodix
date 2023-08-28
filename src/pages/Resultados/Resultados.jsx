import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import { AreaChart, Area, BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import data from '../data.js';

const Resultados = (props) => {
    const navigate = useNavigate();
    const results = data
        .filter(x => !x.autoAdjust)
        .map(x => ({ ...x, primeraVuelta: Math.round(Math.random() * 30), segundaVuelta: Math.round(Math.random() * 100) }));

    return (
        <div style={{ padding: '2.5%', width: "95%", height: "90vh" }}>
            <Typography variant="h6" gutterBottom component="div">{`Lo que votaron otras personas`} </Typography>
            <ResponsiveContainer minWidth={'900px'} width="100%" height="95%">
                <BarChart width={500} height={300} data={results} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lastName" fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="primeraVuelta" label='Primera Vuelta' fill="#8884d8" />
                    <Bar dataKey="segundaVuelta" label='Segunda Vuelta' fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            <Button variant="contained" onClick={() => navigate('/votacion')}>Volver</Button>
        </div>

    )
}

export default Resultados