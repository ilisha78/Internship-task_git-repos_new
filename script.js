//profile fetching from api goes here
// Define the base GitHub API URL
const apiUrl = "https://api.github.com/users/";
const getUser = async (username) => {
  const userApiUrl = apiUrl + username;
  
    const response = await fetch(userApiUrl);
    const data = await response.json();
    document.querySelector("#gitName").innerHTML = data.login;
    document.getElementById("git-bio").innerHTML = data.bio;
    document.getElementById("gitlocation").innerHTML = data.location;
    document.getElementById("twitter-link").innerHTML = data.twitter_username;
    document.getElementById("git-link").innerHTML = data.html_url;
    document.querySelector("#avatar-img").innerHTML = `
      <img id="avatar-img" src="${data.avatar_url}" alt="GitHub Avatar">
    `;
  }
const username = "ilisha78";
getUser(username);


//here is repos but it display all repos in one page{so that we can know how many total repos does this profile have}
// const apiUrlRepo = "https://api.github.com/users/Sajaljaiswal/repos";
// const getUserRepo = async () => {
//   const response = await fetch(apiUrlRepo);
//   const data2 = await response.json();
//   console.log(data2);

// const container = document.getElementById('repo-container');
//   const cards = data2.map(
//     (repo) => `
//     <div class="col-sm-6">
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title" id="repo-name">${repo.name}</h5>
//           <p class="card-text" id="repo-desc">${
//             repo.description || "No description available."
//           }</p>
//           <a href="#" class="btn btn-primary">${repo.language}</a>
//         </div>
//       </div>
//     </div>
//   `
//   );
//       container.innerHTML = cards.join('');
// };
// getUserRepo();




//repos on each page fetching from api goes here
const apiUrlRepo = "https://api.github.com/users/Sajaljaiswal/repos";
const getUserRepo = async () => {
    const response = await fetch(apiUrlRepo);
    const data2 = await response.json();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const displayedRepos = data2.slice(start, end);
    const container = document.getElementById('repo-container');
    const cards = displayedRepos.map(
      (repo) => `
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" id="repo-name">${repo.name}</h5>
            <p class="card-text" id="repo-desc">${
              repo.description || "No description available."
            }</p>
            <a href="#" class="btn btn-primary">${repo.language}</a>
          </div>
        </div>
      </div>
    `
    );
    container.innerHTML = cards.join('');
    updatePagination();
  }


//pagination goes here but doesn't work
const itemsPerPage = 10;
let currentPage = 1;
let data2 = []; 
const updatePagination = () => {
  const totalPages = Math.ceil(data2.length / itemsPerPage);
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  if (currentPage > 1) {
    const olderButton = createPaginationButton('Older', currentPage - 1);
    paginationContainer.appendChild(olderButton);
  }

  if (currentPage < totalPages) {
    const newerButton = createPaginationButton('Newer', currentPage + 1);
    paginationContainer.appendChild(newerButton);
  }
};

const createPaginationButton = (label, targetPage) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-secondary', 'mr-2');
  button.innerText = label;
  button.addEventListener('click', () => {
    currentPage = targetPage;
    displayCurrentPage();;
  });
  return button;
};


async function init() {
  await getUser();
  await getUserRepo();
  displayCurrentPage();
  updatePagination();
}

init();
