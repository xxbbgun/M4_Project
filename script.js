window.addEventListener('load', () => {
    fetch('https://api.jikan.moe/v3/search/anime?q=pokemonmovie', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        data.results.map(element => {
            console.log(element);
            show_content(element)
        });
    })
})
const show = document.getElementById('show');

function show_content(element) {
    const div_show = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h5');
    const synopsis = document.createElement('p');
    img.src = element.image_url;
    title.innerHTML = element.title;
    synopsis.innerHTML =  element.synopsis;
    div_show.appendChild(img);
    div_show.appendChild(title);
    div_show.appendChild(synopsis); 
    div_show.addEventListener('dblclick',(event) => {
    let confirmAdd = confirm(`คุณต้องการเพิ่ม ${element.title} เป็นหนังที่ชื่นชอบหรือไม่`)
    if (confirmAdd){
         addFavoriteToDB(element)
    }
})
    show.appendChild(div_show);
   
}

document.getElementById('searchButton').addEventListener('click',() =>{
    let element = document.getElementById('inputText').value
    searchQuery(element)
})
function searchQuery(element){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${element}`,{
        method: 'GET'
    }) 
    .then((response) => {
        return response.json();
    }).then((data) => {
         show.innerHTML = ""
        data.results.map
        (element => {
            console.log(element);
           
            show_content(element)
        });
    })
    // .then((response) =>{
    //     return response.json()
    //  }).then.data.results.forEach(element => {
    //      console.log(element)
    //  }) .then(data =>{
    //     searchResultList(data.results)
    // })
}
function searchResultList(searchResultList){
    const searchTable = document.getElementById('searchList')
    searchTable.innerHTML = ''
    for(searchdatalist of searchResultList){
        show_content(searchdatalist)
    }
}

function addFavoriteToDB(element){
    
    var favoriteID = 1
    let Favorite = `{"url":"${element.url},"image_url":"${element.image_url}","title":"${element.title}","synopsis" :"${element.synopsis}",
    "type":"${element.type}","episodes":"${element.episodes}","score":"${element.score}","rated":"${element.rated}","id":"${id}"}`
    fetch('https://se104-project-backend.du.r.appspot.com/movies',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:`{"id":"632110334","movie":${Favorite}}`
    }) .then(response=>{
        if(response.status == 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert('Add favorite success')
        favoriteID++
    }).catch(error =>{
        alert('Add favorite Error')
    })
}


