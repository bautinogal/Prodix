import { Backdrop, CircularProgress } from '@mui/material';

const LoadingModal = (props) => {
    return (<div>
        <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <CircularProgress color={'secondary'} />
        </Backdrop>
    </div>)
};

export default LoadingModal;
