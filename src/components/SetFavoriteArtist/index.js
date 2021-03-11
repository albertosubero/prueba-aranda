import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';

function SetFavoriteArtist({id, artists, removeFavorite}) {
    const [color, SetColor]= useState('black');
    const setFavorite = () => {
        var fav = [];
        fav = JSON.parse(localStorage.getItem('favorites')) || [];
        if(fav.find(x => x.artist.artist_id === id)) {
            let index = fav.map(function (item) {
                return item.artist.artist_id
            }).indexOf(id);
            fav.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(fav));
            SetColor('black');
            removeFavorite();
        } else {
            fav.push(artists.find(x => x.artist.artist_id === id));
            localStorage.setItem('favorites', JSON.stringify(fav));
            SetColor('yellow');
        }
    }

    useEffect(() => {
        var fav = JSON.parse(localStorage.getItem('favorites')) || [];
        if(fav.find(x => x.artist.artist_id === id)) {
            SetColor('yellow');
        }
    }, []);

    return (
        <>
            <Icon size='small' color={color} name='favorite' onClick={() => setFavorite()} />
        </>
    );
}

export default SetFavoriteArtist;
