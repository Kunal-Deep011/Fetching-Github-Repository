let currentPage = 1;
const reposPerPage = 10;

function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }

hideLoader();

function getRepo() {
    showLoader();
    const username = document.getElementById('username').value;
    const repoContainer = document.getElementById('repo-02');
    const userContainer=document.getElementById('repo-01');


    document.querySelector(".container").classList.add("hidden");

    document.querySelector(".heading").classList.add("hidden");

    document.querySelector('#nextButton').classList.remove("hidden");
    document.querySelector('#prevButton').classList.remove("hidden");


    userContainer.innerHTML = '';
    repoContainer.innerHTML = '';
   

        fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`)
        .then(response => response.json())
        .then((repo) =>{



            
            fetch(`https://api.github.com/users/${username}`).then(response => response.json())
         .then((user)=>{
           const userElement= document.createElement('div');
           userElement.setAttribute('class','userBox');

           userElement.innerHTML=`
            <div class="paraBox">
                     <div class="img"><img src="${user.avatar_url}"></div>
                     <div class="leftBox">
                            <h4><span class="dash">||</span> ${user.name} <span class="dash">||</span></h4>
                            <p><span class="dash1">Bio :</span> ${user.bio}</p>
                            <p class="logo"><span class="material-symbols-outlined">
                                  location_on
                               </span> <span class="location">${user.location}</span></p>
                            <p><span class="dash1">Twitter :</span> ${user.twitter_username}</p>
                     </div>
                     
            </div>
            <div class="linkBox">
                    <p class="link"><span class="material-symbols-outlined">
                            link
                        </span> <span class="html-link"> ${user.html_url}</span></p>
            </div>
           `;
           userContainer.appendChild(userElement);
           console.log(user);
    }).catch(error =>{
        `<p>Error: No such Repository Exits</p>`;
    });


            repo.forEach(repo =>{
                const repoElement = document.createElement('div');
                repoElement.setAttribute('class','userContent');
                repoElement.innerHTML = `
                <p>${repo.name}</p>
                <p class="desp">${repo.description}</p>
                <div class="l1"><p class="language">${repo.language}</p></div>
                `;
                repoContainer.appendChild(repoElement);
                console.log(repo);
            });      
        })
        .catch(error => {
            repoContainer.innerHTML = `<p>Error: No such Repository Exits</p>`;
          
        })
        .finally(() => {
            hideLoader();
          });

}

//function for next-button
function nextPage() {
    currentPage++;
    getRepo();
  }
 //function for previous-button 
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      getRepo();
    }
  }


  document.getElementById('nextButton').addEventListener('click', nextPage);
  document.getElementById('prevButton').addEventListener('click', prevPage);

 
  document.querySelector('#nextButton').classList.add("hidden");
  document.querySelector('#prevButton').classList.add("hidden");
  
  
  
