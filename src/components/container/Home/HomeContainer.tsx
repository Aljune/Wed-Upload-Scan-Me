import React from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

interface HomeProps {
  titile: string

}

const HomeContainer: React.FC<HomeProps> = (props) => {

    return (
        <>
        <Container maxWidth="xl">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                {props.titile}
            </Box>
        </Container>
        
        </>
    )
}
export default HomeContainer;