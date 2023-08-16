import { useRef, useState, useMemo } from 'react';
import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import data from './data';

export default function Main() {

    const [votado, setVotado] = useState(false);

    const Votacion = (props) => {
        //"Si la fórmula más votada obtiene más del 45% del voto válidamente emitido o 
        //más del 40% con una diferencia mayor al 10% con la fórmula que le sigue en votos"

        const [values, setValues] = useState(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null, firstRoundWinner: false })));

        const handleChangePrimary = (e, x) => {

            const resetBallotage = _values => _values.map(v => ({ ...v, ballotage: null, firstRoundWinner: false, ballotageWinner: false }));

            let freePoints = values?.reduce((p, x) => p + (x.autoAdjust ? x.value : 0), 0);
            let freePointsElementsCount = values?.reduce((p, x) => p + (x.autoAdjust ? 1 : 0), 0);
            let oldValue = values?.find(v => v.group === x.group)?.value;
            let newValue = parseFloat(Math.min(oldValue + freePoints, e.target.value).toFixed(2));
            let dif = newValue - oldValue;
            let _values = values?.map(d => x.group === d.group ? { ...d, value: newValue } : { ...d })
            _values = _values?.map(d => d.autoAdjust ? { ...d, value: parseFloat((d.value - dif / freePointsElementsCount).toFixed(2)) } : { ...d })

            let [first, second] = _values.filter(v => !v.autoAdjust)?.sort((a, b) => b.value - a.value).slice(0, 2);

            //Direct firstRoundWinner
            if (first?.value > 45) {
                _values = resetBallotage(_values);
                _values.find(v => v.group === first.group).firstRoundWinner = true;
            }
            //Direct firstRoundWinner
            else if (first?.value > 40 && first?.value - second?.value > 10) {
                _values = resetBallotage(_values);
                _values.find(v => v.group === first.group).firstRoundWinner = true;
            }
            //Ballotage participants changed
            else if (first?.value > 0 && second?.value > 0 && ((first && !first.ballotage) || (second && !second.ballotage))) {
                _values = resetBallotage(_values);
                if (first) _values.find(v => v.group === first.group).ballotage = 50;
                if (second) _values.find(v => v.group === second.group).ballotage = 50;
            } else if (first?.value === 0 || second?.value === 0) {
                _values = resetBallotage(_values);
            }

            setValues(_values);
        }

        const handleChangeBallotage = (e, x) => {
            let _values = values.map(d => x.group === d.group ?
                { ...d, ballotage: e.target.value } :
                { ...d, ballotage: d.ballotage ? parseFloat((100 - e.target.value).toFixed(2)) : null })

            _values = _values.map(d => ({ ...d, ballotageWinner: d.ballotage > 50 ? true : false }));
            setValues(_values)
        }

        return (
            <Grid container spacing={2} padding={'20px'}>
                <Grid item xs={8}>
                    <Typography variant="h6" gutterBottom component="div">{`Prode Elecciones 2023`} </Typography>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={1} >
                    <Button variant="contained" onClick={() => setValues(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null })))}>Reset</Button>
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={1.5} />
                <Grid item xs={9}>
                    {values?.map(x =>
                        <Grid item key={x.group} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={1} />
                                <Grid item xs={1}>
                                    <Avatar src={x.profileURL} sx={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" gutterBottom component="div">{`${x.lastName}, ${x.name}`} </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Slider
                                        style={{ color: x.color }}
                                        step={0.01}
                                        valueLabelDisplay="on"
                                        value={x.value}
                                        onChange={e => handleChangePrimary(e, x)} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Input
                                        value={x.value}
                                        size="small"
                                        onChange={e => handleChangePrimary(e, x)}
                                        inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    {x.firstRoundWinner ? <EmojiEvents sx={{ color: 'gold' }} /> : null}
                                </Grid>
                            </Grid>
                        </Grid>)}
                </Grid>
                <Grid item xs={1.5} />
                <Grid item xs={8}>
                    <Typography variant="h6" gutterBottom component="div">{`Ballotage`} </Typography>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={1.5} />
                <Grid item xs={9}>
                    {values.filter(v => v.ballotage).length === 2 ? values.filter(v => v.ballotage)?.map(x =>
                        <Grid item key={x.group} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={1} />
                                <Grid item xs={1}>
                                    <Avatar src={x.profileURL} sx={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" gutterBottom component="div">{`${x.lastName}, ${x.name}`} </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Slider
                                        style={{ color: x.color }}
                                        step={0.01}
                                        valueLabelDisplay="on"
                                        value={x.ballotage}
                                        onChange={e => handleChangeBallotage(e, x)} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Input
                                        value={x.ballotage}
                                        size="small"
                                        onChange={e => handleChangeBallotage(e, x)}
                                        inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    {x.ballotageWinner ? <EmojiEvents sx={{ color: 'gold' }} /> : null}
                                </Grid>
                            </Grid>
                        </Grid>) : null}
                </Grid>
                <Grid item xs={1.5} />
                <Grid item xs={10} />
                <Grid item xs={2}>
                    <Button variant="contained"
                        disabled={!values.find(v => v.firstRoundWinner || v.ballotageWinner)}
                        onClick={() => setVotado(true)}>Guardar</Button>
                </Grid>
            </Grid>
        );
    }

    const Resultados = (props) => {

        const results = Array(21).fill(0).map((x, i) => {
            let res = { name: `${i * 5}%` };
            data.forEach(d => res[d.lastName] = Math.random() * 400);
            console.log(res)
            return res;
        });


        return (<>
            <AreaChart
                width={1500}
                height={800}
                data={results}
                margin={{ top: 100, right: 50, left: 50, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {data.map(d => <Area type="monotone" dataKey={d.lastName} stackId="1" stroke={d.color} fill={d.color} />)}
            </AreaChart>
            <Button variant="contained" onClick={() => setVotado(false)}>Volver</Button>
        </>)
    }

    return (votado ? <Resultados /> : <Votacion />);
}