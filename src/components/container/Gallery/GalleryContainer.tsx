import React from 'react';
import { Box, Container, Grid, Paper } from "@mui/material";
import HeaderBanner from "../../Front/HeaderBanner";
import CardItem from "../commons/CardItem";
import useUploadHook from "../../hooks/useUploadHook";
import Loading from "../commons/Loading";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface GalleryProps {
  role: string;
}

const GalleryComponent = (props: GalleryProps) => {

  const {listItem, loading, fethDataList, setIdDelete, errorMessage} = useUploadHook();
  const init = () => {
    fethDataList();
  }
  React.useEffect(init, []);
    return (
        <>
            <HeaderBanner/>
            
            {loading 
              ? 
              <Loading /> 
              : 
              <>
                <Grid container={true}  spacing={2}  gap={2} padding={2}>
                  <Grid item xs={12}>
                      <Container maxWidth="lg" >
                            {loading && <Loading />}
                            {errorMessage && (
                              <>
                                <Stack sx={{ width: '100%' }} marginY={2} spacing={2}>
                                  <Alert severity="error">{errorMessage}</Alert>
                                </Stack>
                              </>
                            )}
                              <Paper square={false} sx={{ bgcolor: '#c0daef42', padding: '2em' }}>
                                  <Box display={"flex"} flexDirection={"row"} flexWrap={'wrap'} alignItems={'flex-start'}>
                                       {
                                          listItem && listItem[0] && (
                                            <>
                                              <CardItem setIdDelete={setIdDelete} data={listItem[0]?.data} role={props.role}/>
                                            </>
                                          )
                                       }
                                        
                                      </Box>
                              </Paper>
                      </Container>
                  </Grid>
              </Grid>
              </>
            }
            
        </>
    )
}
export default GalleryComponent;