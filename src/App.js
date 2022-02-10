import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
//component import
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

function App() {


  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne).
      then((data) => {
        console.log(data);
        setPlaces(data);
      })
  }, [coordinates, bounds])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }} >
        <Grid item xs={12} md={8} >
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
        <Grid item xs={12} md={4} >
          <List places={places} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
