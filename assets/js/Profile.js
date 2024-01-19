const name = document.querySelector('#userName');
const searchBtn = document.querySelector('#searchBtn');

const displayUserName = document.querySelector('#displayUserName');
const avater = document.querySelector('#avater');
const bio = document.querySelector('#bio');
const location = document.querySelector('#location');
const twitterName = document.querySelector('#twitter_username');

let userData = {};

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
            return showData()
        });
}

const showData = () => {
    displayUserName.textContent = userData.name === null ? userData.login : userData.name;
    avater.src = userData.avatar_url;
    bio.textContent =  userData.bio;
    location.textContent = userData.location;
    twitterName.textContent = '@' + userData.twitter_username
}

fetchData();