const mymodal = document.getElementById('add-modal')

const modal_backdrop = document.getElementById('backdrop')

const cancel_button = mymodal.querySelector('.btn--passive')

const add_movie_button = mymodal.querySelector('.btn--success')

const add_btn = document.querySelector('header button')
//const movie_element_remove = document.getElementById('movie-element')
//console.log(add_btn)
const delete_modal = document.getElementById('delete-modal')



let movie_fields = mymodal.querySelectorAll('input')
let movies = []
let main_title = document.getElementById('entry-text')

const update_main_title = () => {
    if(movies.length == 0) {
        main_title.style.display = 'block'

    } else {
        main_title.style.display = 'none'
    }
}

const render_movie_element = (id,title,image,rating) => {
    let movie_element = document.createElement('li')
    movie_element.className = 'movie-element'
    movie_element.innerHTML = `
    <div class = "movie-element__image" >
    <img src = "${image}">
    </div>
    <div class = "movie-element__info">
    <h2> ${title} </h2>
    <p> ${rating}/out of 5 </p>
    </div>
    `
    movie_element.addEventListener('click',delete_movie_handler.bind(null,id))
    const list_root = document.getElementById('movie-list')
    list_root.append(movie_element)
}


const delete_movie_handler = (id) => {
     //delete_movie(id)
     delete_modal.classList.add('visible')
     add_backdrop()

     const delete_cancel = delete_modal.querySelector('.btn--passive')
    let delete_confirm = delete_modal.querySelector('.btn--danger')

     delete_cancel.removeEventListener('click',cancel_del)
     delete_confirm.replaceWith(delete_confirm.cloneNode(true))
     delete_confirm = delete_modal.querySelector('.btn--danger')

     delete_cancel.addEventListener('click',cancel_del)
     delete_confirm.addEventListener('click',delete_movie.bind(null,id))


}    


const delete_movie = (id) => {
    let index = 0
    for (let movie of movies) {
        if(movie.id == id) {
            break
        }
        index ++
    }

    movies.splice(index,1)
    const list_root = document.getElementById('movie-list')
    list_root.children[index].remove()

    delete_modal.classList.remove('visible')
    modal_backdrop.classList.toggle('visible')
    update_main_title()

}

const add_backdrop = () => {
    modal_backdrop.classList.toggle('visible')
}

const add_modal = () => {
    
    
    mymodal.classList.add('visible')
    add_backdrop()
   
}

const remove_modal = () => {
    
    
    mymodal.classList.remove('visible')
    
   
}

const background_click = () => {
    modal_backdrop.classList.toggle('visible')
    remove_modal()
    delete_modal.classList.remove('visible')
    clear_movie_fields()
}

const cancel_click = () => {
    remove_modal()
    modal_backdrop.classList.toggle('visible')
    clear_movie_fields()
}

const add_movie_click = () => {
    let id = Math.random()
    let title = movie_fields[0].value
    let image = movie_fields[1].value
    let rating = movie_fields[2].value

    if(title.trim() == '' || image.trim() == '' || rating.trim() == '') {
        alert('Enter all reqd fields')
        return
    }
    let movie = {
        id : id,
        title : title,
        image : image,
        rating : rating
    }
    movies.push(movie)
    remove_modal()
    modal_backdrop.classList.toggle('visible')
    clear_movie_fields()
    update_main_title()
    render_movie_element(movie.id,movie.title,movie.image,movie.rating)
    console.log(movies)
}

const clear_movie_fields = () => {
    for (const field of movie_fields) {
        field.value = ''
    }
}

const cancel_del = () => {
    delete_modal.classList.remove('visible')
    modal_backdrop.classList.toggle('visible')
}

add_btn.addEventListener('click', add_modal)
modal_backdrop.addEventListener('click', background_click)
cancel_button.addEventListener('click',cancel_click)
add_movie_button.addEventListener('click', add_movie_click)




