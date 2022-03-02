const API_KEY = '563492ad6f917000010000010ee68c6cf88f4427a94fe9ce63d6e9ed'

const input = document.querySelector('input')
const searchButton = document.querySelector('.search_button')
const showMore = document.querySelector('.show_more')

//intial value
let pageNumber = 1
let searchText = ""
let search = false

// event listeners
input.addEventListener('input', function(evt) {
   evt.preventDefault();
   searchText = evt.target.value;
})
searchButton.addEventListener('click', function(evt) {
    if(searchText === '') {
        alert("please enter th some text to search");
        return;

 
 }
 clearGallery()
 search = true;
 searchPhotos(searchText, pageNumber)

})
// clear function gallery
function clearGallery(){
    document.querySelector('.display_images').innerHTML = ""
    pageNumber = 1
}

// fetching images from API
async function curatedPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })
     const response = await data.json()
     console.log(response)
}
// display images function
function displayImages(response){
    response.photos.forEach((image) => {
        // do something
       const photo = document.createElement('div')
       photo.innerHTML = `<img src=${image.src.large}>
        <figcaption>Photo by: ${image.photographer}</figcaption>`
       document.querySelector('.display_images').appendChild(photo)
    })
}
// search function
 async function searchPhotos (query, pageNumber){
    data = await fetch(`https://api.pexels.com/v1/search?query=
    \]${query}&page=${pageNumber}`,{
        method: 'GET',
        headers: {
            Accept: 'appliction/json',
            Authorization: API_KEY
        }
    })
    const response = await data.json()
    displayImages(response)
 }
 // show more 
 function showMoreimg(){
     showMoreimg.addEventListener('click', () => {
         if(!search){
             pageNumber++;
             curatedPhotos(pageNumber)
         }
         else{
             if(searchText.value===''){
                 pageNumber++;
                 searchPhotos(searchText, pageNumber)
                 return;
             }
         }

     })
 }

curatedPhotos(pageNumber)

