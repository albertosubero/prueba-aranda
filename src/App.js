import React, { useState, useEffect } from 'react';
import { apiKey, apiUrl } from './config';
import ArtistsList from './components/ArtistsList';
import './App.scss';
import { StyledInput } from './styles';
import { Dimmer, Loader, Image, Message } from 'semantic-ui-react';

function App() {
  const [artists, setArtits] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  //Api Call
  const fetchArtists = async() => {
    setLoading(true);
    await fetch(apiUrl+`/chart.artists.get?page=1&page_size=12&apikey=`+apiKey, {
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
        setTitle('Top 12 By Musixmatc');
        setArtits(result.message.body.artist_list || []);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }

  //Search Artist
  const searchInputChange = (event) => {
    setSearchString(event.target.value);
  }

  const searchArtist = async(event) => {
    event.preventDefault();
    setLoading(true);
    await fetch(apiUrl+`/artist.search?q_artist=`+searchString+`&apikey=`+apiKey, {
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
        setTitle('Resultados de Busqueda');
        setArtits(result.message.body.artist_list || []);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }

  const cleanForm = (value) => {
    setSearchString(value);
    fetchArtists();
  }

  const showFavoritesArtists = () => {
    setShowFavorites(!showFavorites);
    if(showFavorites) {
      cleanForm('');
    } else {
      setArtits(JSON.parse(localStorage.getItem('favorites')) || []);
    }
  }

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <>
      <div className="container">
      <form onSubmit={searchArtist}>
        <StyledInput icon='search' placeholder='Buscar Artista' fluid value={searchString} onChange={searchInputChange} />
        <div className="link" onClick={() => cleanForm('')}>Limpiar Busqueda</div>
      </form>
        <h1 className="text-center">{title}</h1>
        <div className="link" onClick={() => showFavoritesArtists()}>{!showFavorites ? ('Ver Artistas Favoritos'):('Volver al Top 12')}</div>
      </div>
      {artists.length > 0 && !loading ? (
        <ArtistsList artists={artists} />
      ) : ''}
      {artists.length === 0 && !loading ? (
        <div className="container">
          <Message
            info
            header='Ups, no se ha encontrado lo que buscaba!'
            content="No hay información Disponible..."
          />
        </div>
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

export default App;
