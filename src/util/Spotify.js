import React from "react";
import { SearchBar } from "../Components/SearchBar/SearchBar";

const clientID= "791d446b8c2c4e5c86238519613412fe";
const redirectURI= "http://localhost:3000/";

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
                //console.log(response);
                return response.json();
            } 
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message) 

        ).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            } else {
                console.log(jsonResponse.tracks.items);
                return jsonResponse.tracks.items.map(track => 
                    ({
                        id :track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        URI: track.uri
                    })
                )
            }    
        })
    }
} 

export default Spotify;