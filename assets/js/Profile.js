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

let loading = false;

const loadRepos = (name = 'Dodul01', per_page = '10', page = '1') => {
    loading = true
    showLoading()
    fetch(`https://api.github.com/users/${name}/repos?page=${page}&per_page=${per_page}`)
        .then(res => res.json())
        .then(data => {
            // Clear the array
            repos = [];
            // insert new repository info
            repos = data;
            loading = false;
            showLoading()
            showRepoList();
        })
}

// Show Loading 
const showLoading = () => {
    const reposContainer = document.querySelector('#repos-list');

    reposContainer.innerHTML = ''

    if (loading) {
        const loadingPage = document.createElement('div');
        const loadingText = document.createElement('h1');

        loadingText.textContent = 'Loading...';
        loadingPage.classList.add('loading_page');

        loadingPage.appendChild(loadingText)
        reposContainer.appendChild(loadingPage)
    }
}

// show repos data
const showRepoList = () => {
    const reposContainer = document.querySelector('#repos-list');
    // clear html container
    reposContainer.innerHTML = '';

    reposContainer.classList.add('repository_container')

    if (repos.length == 0) {
        const emptyPage = document.createElement('div');
        const message = document.createElement('h1');

        message.textContent = 'Opps No data available';
        emptyPage.classList.add('empty_page');

        emptyPage.appendChild(message)

        return reposContainer.appendChild(emptyPage)
    }

    repos.map(repo => {
        const repoContainer = document.createElement('figure');
        const title = document.createElement('h1');
        const description = document.createElement('p');

        title.textContent = repo.name;
        description.textContent = repo.description;

        repoContainer.appendChild(title);
        repoContainer.appendChild(description)
        reposContainer.appendChild(repoContainer)

        repoContainer.classList.add('repository_card')

        if (repo.topics.length > 0) {
            const topicsContainer = document.createElement('div');

            repo.topics.map((topic) => {
                const topicBTN = document.createElement('button')
                topicBTN.textContent = topic;
                topicsContainer.appendChild(topicBTN)
            })

            repoContainer.appendChild(topicsContainer)
        }
    })
}



document.addEventListener('DOMContentLoaded', function () {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = 9;
    let currentPage = 1;

    function renderPagination() {
        paginationContainer.innerHTML = '';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';


        prevButton.addEventListener('click', () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);


        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;

            if (currentPage == i) {
                pageButton.classList.add('blue-background')
            }

            pageButton.addEventListener('click', () => goToPage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => goToPage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }

    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderPagination();

            loadRepos(userData.login, 10, currentPage);
        }
    }

    renderPagination();
});





fetchData();