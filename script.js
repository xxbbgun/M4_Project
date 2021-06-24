//โหลดค่าจากapi
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
//แสดงชื่อหนัง
function show_content(element) {
    const div_show = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h6');
    const synopsis = document.createElement('p');
    img.src = element.image_url;
    title.innerHTML = element.title;
    synopsis.innerHTML = element.synopsis;
    div_show.appendChild(img);
    div_show.appendChild(title);
    div_show.appendChild(synopsis);
    div_show.addEventListener('dblclick', (event) => {
        let confirmAdd = confirm(`คุณต้องการเพิ่ม ${element.title} เป็นหนังที่ชื่นชอบหรือไม่`)
        if (confirmAdd) {
            addFavoriteToDB(element)
        }
    })
    show.appendChild(div_show);

}
//ปุ่มsearch
document.getElementById('searchButton').addEventListener('click', () => {
    let element = document.getElementById('inputText').value
    searchQuery(element)
})
//searchหนัง+show
function searchQuery(element) {
    fetch(`https://api.jikan.moe/v3/search/anime?q=${element}`, {
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

//เพิ่มหนังที่ชอบ
function addFavoriteToDB(element) {

    var id = 1
    let Favorite = `{"url":"${element.url}","image_url":"${element.image_url}","title":"${element.title}","synopsis" :"${element.synopsis}",
    "type":"${element.type}","episodes":"${element.episodes}","score":"${element.score}","rated":"${element.rated}","id":"${id}"}`
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"id":"632110334","movie":${Favorite}}`
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert('Add favorite success')
        id++
    }).catch(error => {
        alert('Add favorite Error')
    })
}
//เรียกแสดงลิสหนังที่ชอบ
function favoriteList(element) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110334`, {
        method: 'GET'
    })
        .then((response) => {
            return response.json();
        }).then((data) => {
            show.innerHTML = ""
            data.map
                (element => {
                    console.log(element);

                    show_content_favorite (element)
                });
        })
}
//กดปุ่มfavorite
document.getElementById('favorite').addEventListener('click', () => {
    favoriteList();
})
//ฟังก์ชั่นแสดงค่าหนังที่ชอบ(มีปุ่มรายละเอียด+ลบ)
function show_content_favorite(element) {
    const div_show = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h6');
    img.src = element.image_url;
    title.innerHTML = `Name : ${element.title}`;
     
    let detail = document.createElement('button')
    detail.classList.add('btn')
    detail.classList.add('btn-primary')
    detail.setAttribute('type','button')
    detail.innerHTML ="Details"
    detail.addEventListener('click',()=>{
        getdetail(element.id)
    })

    let deletes = document.createElement('button')
    deletes.classList.add('btn')
	deletes.classList.add('btn-danger')
	deletes.setAttribute('type','button')
    deletes.innerHTML = "Delete"
    deletes.addEventListener("click",()=>{
        let confirmdelete = confirm(`คุณต้องการจะลบ ${element.title} ใช่หรือไมj`)
        if(confirmdelete){
            delete_movie(element.id)
        }
    })
   
    div_show.appendChild(img);
    div_show.appendChild(title); 
    div_show.appendChild(detail);
    div_show.appendChild(deletes);
   
    show.appendChild(div_show);
   
}
//ลบรายชื่อหนังที่ชอบ
function  delete_movie(id){
	fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110334&&movieId=${id}`, {
		method: 'DELETE'
	}).then((response) => {
		if (response.status === 200){
			return response.json()
        }
       
	}).then(data => {
        // show.innerHTML = ""
		alert(`Your movie is now deleted`)
		favoriteList()
	}).catch((error) => {
		console.error(error) 
	})
}
//เรียกรายละเอียดจากdb
function getdetail(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110334/${id}`)
    .then((response) =>{
        return response.json()
    }).then((data) => {
        show.innerHTML = ""
       showdetail(data)
            })
}
//รายละเอียดหนังที่ชอบ
function showdetail(element){
    const div_show = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h5');
    const synopsis = document.createElement('p');
    const type = document.createElement('p');
    const score = document.createElement('p');
    const rated = document.createElement('p');
    img.src = element.image_url;
    title.innerHTML = `Name : ${element.title}`
    synopsis.innerHTML = `Synopsis : ${element.synopsis}`
    type.innerHTML = `Type : ${element.type}`
    score.innerHTML = `Score : ${element.score}`
    rated.innerHTML = `Rated: ${element.rated}`
    div_show.appendChild(img);
    div_show.appendChild(title);
    div_show.appendChild(synopsis);
    div_show.appendChild(type);
    div_show.appendChild(score);
    div_show.appendChild(rated);
    show.appendChild(div_show);
}