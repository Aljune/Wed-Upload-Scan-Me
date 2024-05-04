import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import HeaderBanner from "../../Front/HeaderBanner";

const SuccessContainer = () => {

    return (
        <>
            <HeaderBanner/>
            <Grid container={true}  spacing={2}  gap={2} padding={2}>
                <Grid item xs={12}>
                    <Container maxWidth="lg" >
                            <Paper square={false} sx={{ bgcolor: '#c0daef42', padding: '2em' }}>
                                <Box display={"flex"} gap={2} flexDirection={"column"} justifyContent={'center'} flexWrap={'wrap'} alignItems={'center'}>
                                    <Grid item>
                                        <Typography variant="body1" color="initial">Message and photo sent!</Typography>
                                    </Grid>
                                    <Grid>
                                        <a href="/user-gallery">
                                            <Button size="medium" variant='contained' sx={{backgroundColor:'#7aa6b7'}} type={'button'}>OK</Button>
                                        </a>
                                    </Grid>
                                </Box>
                            </Paper>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}
export default SuccessContainer;