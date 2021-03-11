import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { StyledCard } from './styles';
import ArtistsDetails from '../ArtistDetails';
import SetFavoriteArtist from '../SetFavoriteArtist';
import { apiKey, apiUrl } from '../../config';

function ArtistsList({artists}) {
  const [isOpen, setIsOpen] = useState(false);
  const [artist, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artistId, setArtistId] = useState('');
  const [loading, setLoading] = useState(false);

  const openModal = (id) => {
    setIsOpen(true);

    fetchArtistDetails(id);
    setArtistId(id);
  }

  //Get Artist Details
  const fetchArtistDetails = async(id) => {
    setArtist([]);
    setLoading(true);
    await fetch(apiUrl+`/artist.get?artist_id=`+id+`&apikey=`+apiKey, {
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
        setArtist(result.message.body.artist || []);
        fetchArtistAlbums(id);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }

  //Get Artist Albums
  const fetchArtistAlbums = async(id) => {
    setLoading(true);
    setAlbums([]);
    await fetch(apiUrl+`/artist.albums.get?artist_id=`+id+`&apikey=`+apiKey, {
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
      setAlbums(result.message.body.album_list || []);
      setLoading(false);
    },
    (error) => {
        console.log(error);
        setLoading(false);
    }
    );
  }
    
  return (
    <>
      <div className="container">
        <div className="row">
        {artists.map(artist => (
          <div className="col-xs-12 col-sm-6 col-md-3" key={artist.artist.artist_id}>
            <StyledCard className="full-width">
              <StyledCard.Content>
                <SetFavoriteArtist id={artist.artist.artist_id} artists={artists} />
                <StyledCard.Header>{ artist.artist.artist_name }</StyledCard.Header>
                <StyledCard.Meta>{ artist.artist.artist_country }</StyledCard.Meta>
                <StyledCard.Description>
                  <strong>Begin Date: </strong>{ artist.artist.begin_date }
                </StyledCard.Description>
              </StyledCard.Content>
              <StyledCard.Content extra>
                <Button size='tiny' color='orange' floated='right' icon='search' onClick={() => openModal(artist.artist.artist_id)} />
                <a href={artist.artist.artist_twitter_url} target="_blank">
                  <Button size='tiny' color='twitter' floated='right' icon='twitter' />
                </a>
              </StyledCard.Content>
            </StyledCard>
          </div>
        ))}
        </div>
      </div>
      <ArtistsDetails open={isOpen} modalActions={setIsOpen} artistDetails={artist} albums={albums} artists={artists} loading={loading} />
    </>
  );
}

export default ArtistsList;
