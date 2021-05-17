document.getElementById('getPosts').addEventListener('click', getPosts);
    document.getElementById('submitPost').addEventListener('click', submitPost);

    //submitting a post
    function submitPost(e){
      e.preventDefault();

      let title = document.getElementById('title').value;
      let body = document.getElementById('body').value;

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({title:title, body:body})
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
    }

    //getting posts and filtering 
    function getPosts(){
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res=>{
            return res.json()
        }))
        .then((data=>{
           let output = "<h3>Posts:</h3>"+
                       "<div class='form-group'>"+
                       "<input type='text' id='search' class='form-control' placeholder='search by title or ID..'>"+
                       "</div>";
            data.forEach(post => {
                output += `
            <ul class="list-group mb-3" id="${post.id}">
              <li class="list-group-item"><strong>ID:</strong> ${post.id}</li>
              <li class="list-group-item"><strong>Title:</strong> ${post.title}</li>
              <li class="list-group-item"><strong>Body:</strong> ${post.body}</li>
            </ul>
          `;
            })

            document.getElementById('posts').innerHTML = output;
            //filtering function
            document.getElementById('search').addEventListener('keyup', search);
                
            function search(){
                let value = document.getElementById('search').value;
                data.forEach(post=>{
                            if((post.id == value)||(post.title.indexOf(value) > -1)||(value == '')){
                            document.getElementById(post.id).style.display = 'block';
                                
                            }
                            else{
                                document.getElementById(post.id).style.display = 'none';
                            }
  
  
                })
            }
            
        }))
    }
