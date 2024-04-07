
const post_list = document.querySelector('.posts')
const post_template = document.getElementById('single-post')
const form = document.querySelector('#new-post form')
const button = document.querySelector('#available-posts button')
const postlist = document.querySelector('ul')

function sendHttpRequest(req,url,data) {
/*
    const prom = new Promise( (resolve,reject) => {
        
        const xhr = new XMLHttpRequest

        xhr.open(req,url)

        xhr.responseType = 'json'

        xhr.onload = function() {
            if(xhr.status >=200 && xhr.status <300) {
                resolve(xhr.response)
            }else{
                reject(new Error('FUBAR'))
            }
            
            //console.log(postlist)
        }
        xhr.send(JSON.stringify(data))


    })
    return prom
    */
   return fetch(url,{
    method : req,
    body : JSON.stringify(data),
    headers : {
        'Content-Type' : 'application/json'
    }
   }).then(response => {

    if(response.status >=200 && response.status <300) {
        
        return response.json()
        
    }else{
        
        return response.json().then(ErrData => {
            console.log(ErrData)
            throw new Error('Problem with GET request')
        })    
        //reject(new Error('FUBAR'))
    } 
   })
   .catch( error => {
    console.log(error)
    throw new Error('Operation not successful ...')
   })

}


async function getPosts() {
    
    try {
        const responseData = await sendHttpRequest('GET','https://jsonplaceholder.typicode.com/posts')

    const postlist = responseData
    for(const post of postlist) {
        const postEl = document.importNode(post_template.content,true)
        postEl.querySelector('h2').textContent = post.title.toUpperCase()
        postEl.querySelector('p').textContent = post.body
        postEl.querySelector('li').id=post.id
        post_list.append(postEl)
    } 

    }catch (error){
        alert(error.message)
    }
    

}

async function createPost(title,content) {
    const userId = Math.random()
    const post = {
        title : title,
        content : content,
        userId : userId
    }
    sendHttpRequest('POST','https://jsonplaceholder.typicode.com/posts',post )

}

//getPosts()
button.addEventListener('click',getPosts)
//createPost('Test', 'This is a test post')
form.addEventListener('submit',(event) => {
    event.preventDefault()
    const input_title = event.currentTarget.querySelector('#title').value
    const input_content = event.currentTarget.querySelector('#content').value
    createPost(input_title,input_content)
})

post_list.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id
        sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }

})


