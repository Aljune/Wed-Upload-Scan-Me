import React from 'react';
// import { Link } from 'react-router-dom';
import { Paper, Box } from '@mui/material';
import Banner from '../../../assets/images/banner/wedding-bg.png';


const HeaderBanner = () => {
    return (
    <>
        <Paper sx={{ overflow:'hidden', height: '50vh', minWidth: '100%' ,position: 'relative', display:"flex", alignItems:"center", justifyContent: 'center'}}>
            <img src={Banner} alt="" style={{minWidth: '100%'}} />
            <Box
                width={'100%'}
                height={'50vh'}
                my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={4}
                p={2}
                sx={{ border: '2px solid grey' }}
                position={'absolute'}
                bgcolor={'#2b2a2a70'}
            >
                <h1 className='island-moments-regular header-text' style={{fontSize: '6em', color: '#646DC5'}}>
                Groom & Bride 
                </h1>
            </Box>
        </Paper>
    </>

    );
};

export default HeaderBanner;
