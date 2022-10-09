import React from "react";
import { SearchBar } from "../Components/SearchBar/SearchBar";
import { Playlist } from "../Components/Playlist/Playlist";

const clientID= "791d446b8c2c4e5c86238519613412fe";
//const redirectURI= "http://localhost:3000/";
const redirectURI= "https://myjammming.netlify.app" //note: also change this in settings in spotify app!

let key;

const Spotify = {
    
    getAccessToken(){
        if(key){
            return key;
        }

        const matchAccess = window.location.href.match(/access_token=([^&]*)/); 
        const matchExpire = window.location.href.match(/expires_in=([^&]*)/);
                
        if(matchAccess && matchExpire){
            key = matchAccess[1];
            let expiresIn = Number(matchExpire[1]);
            
            window.setTimeout(() => key = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            
            return key;

        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }

        }).then(response => {
            if(response.ok){
                return response.json();
            } 
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message) 

        ).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            } else {
                console.log(jsonResponse.tracks);
                return jsonResponse.tracks.items.map(track => 
                    ({
                        id :track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        URI: track.uri,
                        image: track.album.images[0].url
                    })
                )
            }    
        })
    },

    savePlaylist(playlistName, trackURIs){
        console.log(playlistName);
        if (!playlistName && trackURIs.length) {
            return;
        }

        let accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userID;

        return fetch('https://api.spotify.com/v1/me', {headers:headers}
        ).then ( response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error ('Request failed');
        }, networkError =>console.log(networkError.message)
        ).then(jsonResponse => {
            userID = jsonResponse.id;
         
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method:'POST',
                body: JSON.stringify({name: playlistName})
            }).then ( response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error ('Request failed');
            }, networkError =>console.log(networkError.message)
            ).then(jsonResponse =>{
                let playlistID = jsonResponse.id;
                                
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method:'POST',
                    body: JSON.stringify({uris: trackURIs})
                })
            })
       })
    
    }
} 

export default Spotify;