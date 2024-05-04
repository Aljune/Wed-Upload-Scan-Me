import { Box, Container, Grid, Paper } from "@mui/material";
import HeaderBanner from "../../Front/HeaderBanner";
import CardItem from "../commons/CardItem";
import useUploadHook from "../../hooks/useUploadHook";


const GalleryComponent = () => {

  const {listItem} = useUploadHook();
 
    return (
        <>
            <HeaderBanner/>
            <Grid container={true}  spacing={2}  gap={2} padding={2}>
                <Grid item xs={12}>
                    <Container maxWidth="lg" >
                            <Paper square={false} sx={{ bgcolor: '#c0daef42', padding: '2em' }}>
                                <Box display={"flex"} flexDirection={"row"} flexWrap={'wrap'} alignItems={'flex-start'}>
                                    {listItem && listItem.map((item, index) => (
                                        <CardItem
                                            id={Number(index)}
                                            avatar={item.avatar}
                                            title={item.name}
                                            subheader={item.subheader!}
                                            description={item.message}
                                            image={item.imageUrl!}
                                            method={item.message}
                                        />
                                    ))}
                                    </Box>
                            </Paper>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}
export default GalleryComponent;