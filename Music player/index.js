function gettingSongs(spotifyData){
    const input = document.querySelector('input');
    input.value = '';
    let songs_list = document.querySelector('.songs_list');
    const allSongs =  spotifyData.tracks.items
    for(song of allSongs){
        const songUrl = song.preview_url
        const songName = song.name
        const songArea = document.querySelector('.songs_list');
        const audioTag = document.createElement('p');
        audioTag.setAttribute('href', songUrl)
        audioTag.innerHTML = songName
        //console.log(songName)
        songArea.append(audioTag)
    }
    document.querySelectorAll('p').forEach(()=>{
        addEventListener('click', function(event){
            console.log(event)
        })

    })
}

async function getApi(searchString){ 
    const tokenResponse = await fetch('https://blooming-reef-63913.herokuapp.com/api/token');
    const tokenData = await tokenResponse.json();
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const spotifyResponse = await fetch(`${BASE_URL}?q=${searchString}&type=track`, {
        "headers": {
          "authorization":`Bearer ${tokenData.token}`
        }
    });;
    const spotifyData = await spotifyResponse.json()
    //let music = document.querySelector('audio').setAttribute('src', spotifyData.tracks.items[0].preview_url);
    gettingSongs(spotifyData)
    console.log(spotifyData);
}


document.querySelector('#search_button').addEventListener('click', function(){
    const searchString = document.querySelector('input').value;
    //console.log(searchString)
    getApi(searchString)
})
