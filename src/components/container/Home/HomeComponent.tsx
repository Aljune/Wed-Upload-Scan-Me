import { Paper, Box, Button } from '@mui/material';
import Banner from '../../../assets/images/banner/wed-bg.png';


const HomeComponent = () => {

    return (
        <>
            <Paper sx={{ overflow:'hidden', height: '100vh', minWidth: '100%' ,position: 'relative', display:"flex", alignItems:"center", justifyContent: 'center'}}>
                <img className='home-image-bg' src={Banner} alt=""/>
                <Box
                    width={'100%'}
                    height={'100vh'}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                    p={2}
                    sx={{ border: '2px solid grey' }}
                    position={'absolute'}
                    bgcolor={'#2b2a2a70'}
                    textAlign={'center'}
                >
                    <div>
                        <h1 className='home-name header-text' style={{ color: '#646DC5', textAlign:'center' }}>
                            Aljune <br/>&<br/> Merry Dresa 
                        </h1>
                    </div>
                    <div style={{color: 'white'}} >
                        <p>Hello and welcome to our wedding celebration! We're so glad you're here.</p>
                        <p>We've created a custom guestbook where you can leave your mark and share in our happiness.</p>
                        <p>
                            Thank you for being a part of our love story!
                        </p>
                    </div>
                    <div>
                        <a href="/wed-scan-me-form">
                            <Button sx={{width: '150px'}} fullWidth={false} size="medium" variant='contained' color='success' >ENTER</Button>
                        </a>
                    </div>
                    
                </Box>
        </Paper>
        </>
    )
}
export default HomeComponent;