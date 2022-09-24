import React from 'react';
import './App.css';
import {SearchBar} from './../SearchBar/SearchBar';
import {SearchResults} from './../SearchResults/SearchResults';
import {Playlist} from './../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
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

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults= {this.state.searchResults}/> 
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/> 
          </div>
        </div>
      </div>
    )
  }
}

export default App;
