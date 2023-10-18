import env from '../../config/env.js';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { isIOS } from '../../lib/utils/index.js';
import '../styles/main.css'; 
import '../styles/fontawesome-all.min.css'; 
import '../styles/noscript.css'; 
import '../styles/animate.css'; 
import data from '../data.js';
import {
    Avatar, Badge, Backdrop, Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent, Grid, Slider, Step, StepLabel, Stepper,
    Typography, IconButton, Input
} from '@mui/material';
import { EmojiEvents, EmojiEmotions, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation, InfoSharp } from '@mui/icons-material';
import './Votacion.css';
import '../Landing/css/main.css';
import '../Landing/css/fontawesome-all.min.css';
import '../Landing/css/noscript.css';
import '../Landing/css/animate.css';
import logo4 from '../Landing/img/logo4.png';
import axios from 'axios';

//"Si la fórmula más votada obtiene más del 45% del voto válidamente emitido o 
//más del 40% con una diferencia mayor al 10% con la fórmula que le sigue en votos"
const Votacion = (props) => {
    const navigate = useNavigate();
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [values, setValues] = useState(data?.map(x => ({ ...x, value: x.dfltValue, ballotage: null, firstRoundWinner: false })));
    const [openTutorial, setOpenTutorial] = useState(true);
    const [loading, setLoading] = useState(0);

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

    const TutorialVotacion = () => {
        const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
        const [activeStep, setActiveStep] = useState(0);
        const [skipped, setSkipped] = useState(new Set());

        const handleNext = () => {
            let newSkipped = skipped;
            if (skipped.has(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        };

        const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

        const handleSkip = () => {
            if (activeStep !== 1) throw new Error("You can't skip a step that isn't optional.");

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped((prevSkipped) => {
                const newSkipped = new Set(prevSkipped.values());
                newSkipped.add(activeStep);
                return newSkipped;
            });
        };

        return <Dialog className="dialog-background" onClose={e => setOpenTutorial(false)} open={openTutorial} fullWidth maxWidth='80vw'>
            <DialogTitle>Tutorial De Votación</DialogTitle>
            <DialogContent sx={{ height: '80vh' }}>
                <Box sx={{ height: '60vh', textAlign: 'center' }} children={<img maxWidth={'100%'} height={'90%'} src="./src/landing_mai/img/votodibujo2.png" alt="Descripción" />} />
                <Box sx={{ width: '100%' }} color={'white'}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (index === 1) labelProps.optional = (<Typography variant="caption">Optional</Typography>);
                            if (skipped.has(index)) stepProps.completed = false;
                            return (<Step key={label} {...stepProps} children={<StepLabel olor='white'  {...labelProps} children={label} />} />);
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (<>
                        <Typography sx={{ mt: 2, mb: 1 }} children='All steps completed - you&apos;re finished' />
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} children={<>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={e => setActiveStep(0)}>Reset</Button>
                        </>} />
                    </>) : (<>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} children={'Back'} />
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === 1 && (<Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} children={'Skip'} />)}
                            <Button onClick={handleNext} children={activeStep === steps.length - 1 ? 'Finish' : 'Next'} />
                        </Box>
                    </>)}
                </Box>
            </DialogContent>
        </Dialog>
    }

    const onLogin = async () => {
        if (isAuthenticated && user && !isLoading) {
            console.log('onLogin', loading)
            setLoading(1);
            const accessToken = await getAccessTokenSilently().catch(console.error);
            const { userAgent, hardwareConcurrency: conc, deviceMemory: mem } = navigator;
            let res = await axios.post(`${env.backendUrl}/login`,
                { ...user, userAgent, conc, mem },
                { headers: { 'Authorization': `Bearer ${accessToken}` } })
                .catch(console.error);
            console.log(res.data)
            setValues(res.data)
            setLoading(0);
        }
    }

    const onVotar = async () => {
        setLoading(1);
        const accessToken = await getAccessTokenSilently().catch(console.error);
        const payload = values.map(x => ({
            name: x.name,
            lastName: x.lastName,
            group: x.group,
            value: parseFloat(x.value.toFixed(2)),
            ballotage: parseFloat(x.ballotage?.toFixed(2)),
            firstRoundWinner: x.firstRoundWinner,
            ballotageWinner: x.ballotageWinner
        }));
        let res = await axios.post(`${env.backendUrl}/votacion`, values, { headers: { 'Authorization': `Bearer ${accessToken}` } }).catch(console.error);
        setLoading(0);
        navigate('/resultados');
    }

    useEffect(() => { onLogin(); }, [isAuthenticated, user]);

    return (<div style={{
        backgroundImage: "url(/src/pages/Landing/img/bgWave.png)", backgroundSize: 'cover',
        backgroundRepeatt: 'no-repeat', backgroundAttachment: 'fixed', width: '100%', height: '100%', minHeight: '105vh'
    }}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&display=swap" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        {/* <TutorialVotacion /> */}
        <div>
            <Backdrop open={false} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        <Grid container spacing={2} padding={'20px'}>
            <Grid item xs={9}>
                <Typography variant="h6" gutterBottom component="div"><img src={logo4} alt="logo" style={{ height: '3em', marginTop: '1em', marginLeft: '1em' }} /> </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography style={{fontWeight: 'bold',marginLeft: '1em'}} variant="h6" gutterBottom component="div">{`¿Cómo creés que van a ser los resultados de las elecciones?`} </Typography>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12}>
                {values?.map(x =>
                    <Grid item key={x.group} xs={12} style={{marginLeft:'1em'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                    badgeContent={<EmojiEvents style={{ fontSize: x.firstRoundWinner ? '3.5vh' : '0', color: 'gold', }} />}  >
                                    <Avatar src={x.profileURL} sx={{ width: '7vh', height: '7vh' }} />
                                </Badge>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" overflow={'clip'} fontSize={'3vh'} height={'7vh'} gutterBottom component="div">{`${x.lastName}`} </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Slider
                                    style={{ color: x.color}}
                                    step={0.01}
                                    //valueLabelDisplay="on"
                                    value={x.value}
                                    onChange={e => handleChangePrimary(e, x)} />
                            </Grid>
                            <Grid item xs={2}>
                                <Input
                                    style={{marginLeft:'1em'}}
                                    value={x.value}
                                    size="small"
                                    onChange={e => handleChangePrimary(e, x)}
                                    inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>)}
            </Grid>
            <Grid item xs={8} style={{marginTop:'2em'}}>
                <Typography style={{fontWeight: 'bold',marginLeft: '1em'}} variant="h6" gutterBottom component="div">{`Si hay ballotage sería entre:`} </Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={12}style={{marginLeft:'1em'}}>
                {values.filter(v => v.ballotage).length === 2 ? values.filter(v => v.ballotage)?.map(x =>
                    <Grid item key={x.group} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                    badgeContent={<EmojiEvents style={{ fontSize: x.ballotageWinner ? '3.5vh' : '0', color: 'gold', }} />}  >
                                    <Avatar src={x.profileURL} sx={{ width: '7vh', height: '7vh' }} />
                                </Badge>

                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" overflow={'clip'} fontSize={'3vh'} height={'7vh'} gutterBottom component="div">{`${x.lastName}`} </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Slider style={{ color: x.color }} step={0.01}
                                    //valueLabelDisplay="on"
                                    value={x.ballotage} onChange={e => handleChangeBallotage(e, x)} />
                            </Grid>
                            <Grid item xs={2}>
                                <Input
                                    style={{marginLeft:'1em'}}
                                    value={x.ballotage}
                                    size="small"
                                    onChange={e => handleChangeBallotage(e, x)}
                                    inputProps={{ step: 0.1, min: 0, max: 100, type: 'number' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>) : null}
            </Grid>
            <Grid item xs={12} textAlign={'-webkit-right'}>
                {/* <Button size='small' color='info' className='botton-text botton-resetear'
                    onClick={() => navigate('/resultados')} >
                    Resetear
                </Button> */}
                <ul className="actions stacked">
                        <li><a disabled={!values.find(v => v.firstRoundWinner || v.ballotageWinner)}
                    onClick={onVotar}  href="#" className="mainbtn button bold wide" style={{marginRight:'2em',marginBottom:'2em'}}>GUARDAR</a></li>
                </ul>
            </Grid>
        </Grid>
    </div>);
}


//export default Votacion;
export default withAuthenticationRequired(Votacion, { onRedirecting: () => <h1>Redireccionando</h1>, returnTo: '/votacion' });