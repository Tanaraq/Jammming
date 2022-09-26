import React from 'react';
import './App.css';
import {SearchBar} from './../SearchBar/SearchBar';
import {SearchResults} from './../SearchResults/SearchResults';
import {Playlist} from './../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state= {
      searchResults: [
        { id:1, name:'Everybody dies' , artist:'Ayreon' , album:'The Source'},
        { id:2, name:'Bacchus bene venies', artist:'Datura' , album: 'Gratus et optatus'}
      ],
      playlistName: '',
      playlistTracks: [
        {id:'iets', name:'Requiem' , artist:'Pobel' , album:'Lux Luminem'}
      ]
    }    
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }
  
  addTrack(track){
    let songs = this.state.playlistTracks;
    if (songs.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {      
      songs.push(track);
      this.setState({playlistTracks: songs});
    }
  }

  removeTrack(track){
    let songs = this.state.playlistTracks;
    songs= songs.filter(song => song.id !==track.id
      );
    this.setState({playlistTracks: songs});
  }

  updatePlaylistName(name){
    this.setState({ name: name })
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.map(track => {
      return trackURIs.push(track.uri)
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} 
            />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              /> 
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              /> 
          </div>
        </div>
      </div>
    )
  }
}

export default App;
