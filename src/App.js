import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
//component import
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

function App() {


  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setchildClicked] = useState();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne).
        then((data) => {
          console.log(data);
          setPlaces(data);
          setFilteredPlaces([])
          setRating(0)
          setLoading(false)
        })
    }
  }, [type, bounds])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)
  }, [rating])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }} >
        <Grid item xs={12} md={8} >
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setchildClicked={setchildClicked}
          />
        </Grid>
        <Grid item xs={12} md={4} >
          <List places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
