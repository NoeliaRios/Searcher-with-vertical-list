const input = document.getElementById('autocomplete-input');
const ul = document.getElementById('autocomplete-results');
const apiKey = 'a70dbfe19b800809dfdd3e89e8532c9e';

input.onkeyup = function () {
  const q = input.value;
  // const url = 'https://api.themoviedb.org/3/search/movie?api_key=a70dbfe19b800809dfdd3e89e8532c9e&query=' + q;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=a70dbfe19b800809dfdd3e89e8532c9e&query=${q}`;

  fetch(url)
    .then(res => /* return */ res.json())
    .then(data => {
      const movies = data.results;

      ul.innerHTML = movies.map(movie => `<li id="${movie.id}" class="list-item">${movie.title} <p>algo</p></li>`).join('');
      ul.style.display = 'block';

      document
        .querySelectorAll('li.list-item') //devuelve una NodeList
        .forEach(function (li) {
          li.addEventListener('click', function (e) {
            //   const movieId = e.target.id;
            const movieId = e.currentTarget.id;
            

            input.value = e.target.innerHTML;
            ul.style.display = 'none';

            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
              .then(res => res.json())
              .then(data => {
                console.log(data);

                const elModal = document.querySelector('#el-modal');

                // elModal.style.display = 'block';

                document.querySelector('#el-modal .title').innerHTML = data.original_title;
                document.querySelector('#el-modal .overview').innerHTML = data.overview;


                elModal.classList.add('active');
              })
          });
        });
    })
}

document.querySelector('#el-modal button').onclick = function () {
  document.querySelector('#el-modal').classList.remove('active');
}