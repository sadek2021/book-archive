// Search book
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Error massage 
    const errorMassage = document.getElementById('massage');
    errorMassage.innerText = '';

    if (searchText === '') {
        const h5 = document.createElement('h5');
        h5.innerText = 'Please input a book name';
        errorMassage.appendChild(h5);

        // Remove previous search result 
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    }
    else {

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showTotalSearchResult(data));
    }
    // Clear search field 
    searchField.value = '';
}
const showTotalSearchResult = (result) => {
    const totalDisplaySearchResult = document.getElementById('massage');
    totalDisplaySearchResult.innerText = '';
    if (result.numFound === 0) {
        const h5 = document.createElement('h5');
        h5.innerText = `No result found (${result.numFound})`;
        totalDisplaySearchResult.appendChild(h5);

        // Remove previous search result 
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    }
    else {
        const h5 = document.createElement('h5');
        h5.innerText = `Total Result Found (${result.numFound})`;
        totalDisplaySearchResult.appendChild(h5);
        displaySearchResult(result.docs.slice(0, 30));
    }
}
// Display searching value 
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');

    // Clear previous search result 
    searchResult.textContent = '';
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-danger">${book.title}</h3>
                 <h5 class="card-text">Author Name: ${book.author_name}</h5>
                 <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
             </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};
