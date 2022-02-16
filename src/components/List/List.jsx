import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyle from './styles';

const List = ({ places, childClicked, loading, type, setType, rating, setRating }) => {
    const classes = useStyle();

    const [elRefs, setElrefs] = useState([]);

    useEffect(() => {
        setElrefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container} >
            <Typography variant='h4' >Restaurants, Hotels and Attractions around you</Typography>
            {loading ? (
                <div className={classes.loading} >
                    <CircularProgress size='5rem' />
                </div>

            ) : (
                <>
                    <FormControl className={classes.formControl} >
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)} >
                            <MenuItem value="restaurants" > Restaurant </MenuItem>
                            <MenuItem value="hotels" > Hotel </MenuItem>
                            <MenuItem value="attractions" > Attractions </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} >
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)} >
                            <MenuItem value={0} > All </MenuItem>
                            <MenuItem value={3} > Above 3.0 </MenuItem>
                            <MenuItem value={4} > Above 4.0 </MenuItem>
                            <MenuItem value={4.5} > Above 4.5 </MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list} >
                        {places?.map((place, i) => (
                            <Grid item key={i} xs={12}  >
                                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                            </Grid>
                        ))}
                    </Grid>
                </>)}
        </div>
    );
};

export default List;
