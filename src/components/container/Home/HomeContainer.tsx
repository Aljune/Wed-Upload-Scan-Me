import React from 'react';
import {Grid, Paper, Button, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HeaderBanner from '../../Front/HeaderBanner';
import useUploadHook from '../../hooks/useUploadHook';
import NameInput from '../Form/NameInput';
import MessageInput from '../Form/MessageInput';
import FileUpload from '../commons/FileUpload';


interface HomeProps {
  title: string

}

const HomeContainer: React.FC<HomeProps> = (props) => {
   
    const {submit, handleSubmit, control} = useUploadHook();
    return (
        <>
        <HeaderBanner/>
        <Grid container={true}  spacing={2}  gap={2} padding={2}>
            <Grid item xs={12}>
                <Container maxWidth="lg" >
                    <Paper square={false} sx={{ bgcolor: '#c0daef42', padding: '2em' }}>
                        <Typography variant="h5" color="initial" marginY={2}>
                            {props.title}
                        </Typography>
                            <form onSubmit={handleSubmit(submit)}>
                                <Box  rowGap={2} display={'flex'} flexDirection={'column'} alignItems={'center'} >
                                    <NameInput control={control}/>
                                    <MessageInput control={control}/>
                                    <FileUpload/>
                                    <Button sx={{width: '150px'}} fullWidth={false} type='submit' size="medium" variant='contained' color='success' >Submit Now</Button>
                                </Box>
                            </form>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
        
        </>
    )
}
export default HomeContainer;