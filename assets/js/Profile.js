const name = document.querySelector('#userName');
const searchBtn = document.querySelector('#searchBtn');

const displayUserName = document.querySelector('#displayUserName');
const avater = document.querySelector('#avater');
const bio = document.querySelector('#bio');
const location = document.querySelector('#location');
const twitterName = document.querySelector('#twitter_username');

let userData = {};
let repos = [];

searchBtn.addEventListener('click', () => {
    const searchValue = name.value.toLowerCase();
    fetchData(searchValue);
    name.value = '';
})

const fetchData = (name = 'Dodul01') => {
    fetch(`https://api.github.com/users/${name}`)
        .then(res => res.json())
        .then(data => {
            userData = data;
            loadRepos(data.login);
            return showProfileData()
        });
}

const showProfileData = () => {
    displayUserName.textContent = userData.name === null ? userData.login : userData.name;
    avater.src = userData.avatar_url;
    bio.textContent = userData.bio;
    location.textContent = userData.location;
    twitterName.textContent = 'Twitter: @' + userData.twitter_username
}

const loadRepos = (name = 'Dodul01') => {
    console.log(name);
    fetch(`https://api.github.com/users/${name}/repos`)
        .then(res => res.json())
        .then(data => {
            // Clear the array
            repos = [];
            // insert new repository info
            repos = data;

            showRepoList()
        })
}

const showRepoList = () => {
    const reposContainer = document.querySelector('#repos-list');
    // clear html container
    reposContainer.innerHTML = '';

    reposContainer.classList.add('grid', 'template-col-2')

    repos.map(repo => {
        const repoContainer = document.createElement('figure');
        const title = document.createElement('h1');
        const description = document.createElement('p');

        title.textContent = repo.name;
        description.textContent = repo.description;

        repoContainer.appendChild(title);
        repoContainer.appendChild(description)
        reposContainer.appendChild(repoContainer)
        
        repoContainer.classList.add('border', 'p-10', 'rounded')


        console.log(repo.topics);
    })
}

fetchData();