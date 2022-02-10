import React from 'react';
import { Card, CardMedia, Box, Typography, Button, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
const PlaceDetails = ({ place }) => {
    const classes = useStyles();

    return (
        <Card elevation={6} >
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' > {place.name} </Typography>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant='subtitle1' >Price</Typography>
                    <Typography variant='subtitle1' gutterBottom >{place.price_level ? place.price_level : 'No price levels'}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant='subtitle1' >Rating</Typography>
                    <Typography variant='subtitle1' gutterBottom >{place.rating ? place.rating : 'No ratings'}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant='subtitle1' >Ranking</Typography>
                    <Typography variant='subtitle1' gutterBottom >{place.ranking ? place.ranking : 'No ranking'}</Typography>
                </Box>
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle1" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography variant="body2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;
