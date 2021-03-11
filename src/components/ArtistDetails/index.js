import React, { useState } from 'react';
import { Button, Modal, List, Icon, Accordion, Message, Dimmer, Loader, Image } from 'semantic-ui-react';
import TrackList from '../TrackList';
import SetFavoriteArtist from '../SetFavoriteArtist';

function ArtistsDetails({open, modalActions, artistDetails, albums, artists, loading}) {
  const onAction = event => {
    modalActions(event);
  }
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
    <Modal
      onClose={() => onAction(false)}
      onOpen={() => onAction(true)}
      open={open}
    >
        {artistDetails ? (
            <>
                <Modal.Header>
                    {artistDetails.artist_name} - Discografía
                    <SetFavoriteArtist id={artistDetails.artist_id} artists={artists} />
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {albums.length > 0 && !loading ? (
                            <>
                            <Accordion fluid styled>
                                {albums.map(album => (
                                    <div key={album.album.album_id}>
                                    <Accordion.Title
                                        active={activeIndex === album.album.album_id}
                                        index={album.album.album_id}
                                        onClick={() => setActiveIndex(album.album.album_id)}
                                    >
                                        <Icon name='dropdown' />
                                        {album.album.album_name} - {album.album.album_release_date}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === album.album.album_id}>
                                    <p>Tracklist:</p>    
                                    <List>           
                                        <TrackList albumId={album.album.album_id}/>
                                    </List>
                                    </Accordion.Content>
                                    </div>
                                ))}
                            </Accordion>
                            </>
                        ) : ('')}
                        {albums.length === 0 && !loading ? (
                            <Message
                                info
                                header='Ups, no se ha encontrado lo que buscaba!'
                                content="No hay información Disponible..."
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
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => onAction(false)}>
                    Cerrar
                    </Button>
                </Modal.Actions>
            </>
        ) : ""}
    </Modal>
    </>
  );
}

export default ArtistsDetails;
