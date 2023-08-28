import { useRef, useState, useMemo } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

import data from '../data.js';
import { Avatar, Box, Button, Grid, Slider, Typography, IconButton, Input } from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';

const Votacion = (props) => {
    const navigate = useNavigate();
    //"Si la fórmula más votada obtiene más del 45% del voto válidamente emitido o 
    //más del 40% con una diferencia mayor al 10% con la fórmula que le sigue en votos"
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const [values, setValues] = useState(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null, firstRoundWinner: false })));
    const isIOS = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod']
        .includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)

    const handleChangePrimary = (e, x) => {

        if (isIOS && e.type === 'mousedown') return;
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
        if (isIOS && e.type === 'mousedown') return;
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
            <Grid item xs={2} >
                <Button variant="outlined" onClick={() => setValues(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null })))}>Reset</Button>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12}>
                {values?.map(x =>
                    <Grid item key={x.group} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Avatar src={x.profileURL} sx={{ width: 60, height: 60 }} />
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
                            <Grid item xs={1.4}>
                                <Input
                                    value={x.value}
                                    size="small"
                                    onChange={e => handleChangePrimary(e, x)}
                                    inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                />
                            </Grid>
                            <Grid item xs={0.6}>
                                {x.firstRoundWinner ? <EmojiEvents sx={{ color: 'gold' }} /> : null}
                            </Grid>
                        </Grid>
                    </Grid>)}
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" gutterBottom component="div">{`Ballotage`} </Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={12}>
                {values.filter(v => v.ballotage).length === 2 ? values.filter(v => v.ballotage)?.map(x =>
                    <Grid item key={x.group} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Avatar src={x.profileURL} sx={{ width: 60, height: 60 }} />
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
                            <Grid item xs={1.5}>
                                <Input
                                    value={x.ballotage}
                                    size="small"
                                    onChange={e => handleChangeBallotage(e, x)}
                                    inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                />
                            </Grid>
                            <Grid item xs={0.5}>
                                {x.ballotageWinner ? <EmojiEvents sx={{ color: 'gold' }} /> : null}
                            </Grid>
                        </Grid>
                    </Grid>) : null}
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={3}>
                <Button variant="contained"
                    disabled={!values.find(v => v.firstRoundWinner || v.ballotageWinner)}
                    onClick={() => navigate('/resultados')}>Guardar</Button>
            </Grid>
        </Grid>
    );
}

export default withAuthenticationRequired(Votacion, { onRedirecting: () => <h1>Redireccionando</h1> });