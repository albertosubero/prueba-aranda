import React, { useState, useEffect } from 'react';
import { List, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import { apiKey, apiUrl } from '../../config';

function TrackList({albumId}) {
    const [albumTracks, setAlbumTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    //Get Album Tracks
    const fetchAlbumTracks = async() => {
        setLoading(true);
        await fetch(apiUrl+`/album.tracks.get?album_id=`+albumId+`&apikey=`+apiKey, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
        })
        .then(res => res.json())
        .then(
        (result) => {
          setAlbumTracks(result.message.body.track_list || []);
          setLoading(false);
        },
        (error) => {
            console.log(error);
            setLoading(false);
        }
        );
    }

    useEffect(() => {
        fetchAlbumTracks();
    }, []);

  return (
    <>
        {albumTracks.length > 0 && !loading ? (
            <>
                {albumTracks.map(track => (
                    <List.Item key={track.track.track_id}>
                        <List.Icon name='play circle outline' />
                        <List.Content>
                        <List.Header>{track.track.track_name}</List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </>
        ) : ''}
        {albumTracks.length === 0 && !loading ? (
            <Message
                info
                header='Ups, no hay tracks disponibles para este album!'
            />
        ) : ''}
        {loading ? (
            <div className="container">
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </div>
        ) : ''}
    </>
  );
}

export default TrackList;
