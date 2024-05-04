import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {

    return (
        <>
             <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginY={3}>
                <CircularProgress />
            </Box>
        </>
    );
}
export default Loading;