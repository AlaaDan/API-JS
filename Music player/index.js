function gettingSongs(spotifyData){
    const  songsList = document.querySelector('.songs_list');
    songsList.innerHTML = '';
    document.querySelector('input').value = '';

    let audio= document.querySelector('audio');
    const allSongs =  spotifyData.tracks.items;
    for(song of allSongs){
        const songUrl = song.preview_url;
        const songName = song.name;
        const songArea = document.querySelector('.songs_list');
        const audioTag = document.createElement('a');
        //audioTag.setAttribute('href', songUrl)
        audioTag.innerHTML = songName
        //console.log(songName)
        songArea.append(audioTag)
        audioTag.addEventListener('click',()=>{
            //console.log('URL', songUrl)
            audio.setAttribute('src', songUrl);
            audio.play();
            audio.addEventListener('playing', ()=>{
                document.querySelector('.music_section').classList.add('back');
                document.querySelector('body').classList.add('disco');
            });
            
            audio.addEventListener('ended', ()=>{
                document.querySelector('.music_section').classList.remove('back');
                document.querySelector('body').classList.remove('disco');
            });
            audio.addEventListener('pause', ()=>{
                document.querySelector('.music_section').classList.remove('back');
                document.querySelector('body').classList.remove('disco');
            });
            
        });
    }
    
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
    //console.log(spotifyData);
}




function query(){
    document.querySelector('#search_button').addEventListener('click', function(){
        const searchString = document.querySelector('input').value;
        //console.log(searchString)
        getApi(searchString)
    })

    document.querySelector('input').addEventListener('keydown', (event)=>{
        if(event.key === 'Enter'){
            const SearchStringKeydown = document.querySelector('input').value
            getApi(SearchStringKeydown)
        }
    })
}

query()