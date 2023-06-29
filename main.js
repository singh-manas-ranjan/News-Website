const Api_Key = '1d3a0eefa97b499d8fbc4ee93eeb40b7';
const Url = 'https://newsapi.org/v2/everything?q=';
const date = new Date();

const fullYear = date.getFullYear();
const month = String(date.getMonth()+1).padStart(2,'0');
const day = String(date.getDate()-1).padStart(2,'0');

const queryDate = `${fullYear}-${month}-${day}`;
console.log(queryDate); 

// ======================== ON LOAD WINDOW FETCHING DATA FROM NEWS API ========================

window.addEventListener('load',()=> fetchNews('India'));

// ======================== FETCHING NEWS DATA FROM NEWS API ========================

async function fetchNews(query){
    const res = await fetch(`${Url}${query}&from=${queryDate}&apiKey=${Api_Key}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

// ======================== BINDING JSON DATA TO HTML TEMPLATE ========================
function bindData(articles){
    const cards_container = document.getElementById('cards_container');
    const card_template = document.getElementById('card_template');

    cards_container.innerHTML='';
    
    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const card_clone = card_template.content.cloneNode(true);

        fillDataInCard(card_clone,article);
        cards_container.appendChild(card_clone);
    });
}

function fillDataInCard(card,article){
    const newsTitle = card.getElementById('newsImage');
    const newsSource = card.getElementById('newsSource');
    const newsDesc = card.getElementById('newsDesc');
    const newsImage = card.getElementById('newsImage');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString();
    newsSource.innerHTML = `${article.source.name} — ${date}`;

    card.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })

}

// ======================== SEARCH EVENT ========================

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

let navItemActive = null;
function navItemSearch(navItem){
    fetchNews(navItem);
    window.scrollTo(0,0);
    const selectedNavItem = document.getElementById(navItem);
    navItemActive?.classList.remove('active');
    navItemActive = selectedNavItem;
    navItemActive.classList.add('active');
    searchInput.value = '';
}


searchButton.addEventListener('click',()=>{
    if(!searchInput) return;
    const query = searchInput.value;
    searchInput.value = '';
    fetchNews(query);
    navItemActive.classList.remove('active');
    navItemActive = null;
})

// ======================== NAV-ITEMS CLICK EVENT ========================

const navIcon = document.getElementById('nav-icon');
const searchBar = document.getElementById('search-bar');

navIcon.addEventListener('click',()=>{
    searchBar.classList.toggle('active');
})

// ======================== LOGO CLICK EVENT ========================
const company_logo = document.getElementById('company_logo');
company_logo.addEventListener('click',()=>{
    window.location.reload();
    searchInput.value = '';
})