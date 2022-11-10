function addImagetoHtml(url, title){
    const photosWrapper = document.querySelector('#photos');
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', url); // add the image url to the src attribute 
    imgTag.setAttribute('title', title) // this will add a title to the image when hover over it 

    photosWrapper.append(imgTag);

}


function renderImages(dataFromApi){
    const photosWrapper = document.querySelector('#photos'); // those 2 lines to make the user search again and display the new results 
    photosWrapper.innerHTML = ''

    const allPhotos = dataFromApi.photos.photo
    for (photo of allPhotos){
        if(photo.farm !== 0){
            //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg # this is how you build the image in flickr
            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
            //document.querySelector("main");
            const title = photo.title; // this will get the title of the image and we added it ad an argument to take up
            addImagetoHtml(imageUrl, title);
        }
        
    }

}


async function getImages(search){

    //https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=abc12378asdashdjsah8sds&text=banana=per_page=20&sort=date-taken-asc&format=json
    const base_url = "https://api.flickr.com/services/rest?";
    const api_key = "api_key=89ed120641c8cd915af07ed3c9c146f9"; // My own API key 
    const method = "&method=flickr.photos.search"
    const misc = "&format=json&nojsoncallback=1"

    const url = base_url+api_key+method+ "&text=" + search + misc;
    //console.log(`API URL ${url}`);
    const response = await fetch(url);
    //console.log(response);
    const data = await response.json();
    console.log(data);
    renderImages(data);
};






document.querySelector("#search").addEventListener("click", function(){
    const searchString = document.querySelector("#search-string").value;
    //console.log(searchString);
    getImages(searchString);
});