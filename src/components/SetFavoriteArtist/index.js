import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

function SetFavoriteArtist({id, artists}) {
    const [favoritesArtist, SetFavoriteArtists] = useState([]);
    const [color, SetColor]= useState('black');

    const setFavorite = () => {
        SetFavoriteArtists(JSON.parse(localStorage.getItem('favorites')));
        if(JSON.parse(localStorage.getItem('favorites')).find(x => x.artist.artist_id === id)) {
            let index = favoritesArtist.map(function (item) {
                return item.artist.artist_id
            }).indexOf(id);
            favoritesArtist.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favoritesArtist));
            SetColor('black');
            console.log(favoritesArtist);
        } else {
            favoritesArtist.push(artists.find(x => x.artist.artist_id === id));
            localStorage.setItem('favorites', JSON.stringify(favoritesArtist));
            SetColor('yellow');
            console.log(favoritesArtist);
        }
    }

    return (
        <>
        <Icon size='small' color={color} name='favorite' onClick={() => setFavorite()} />
        </>
    );
}

export default SetFavoriteArtist;
