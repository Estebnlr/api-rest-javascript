let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`;
});
trendingBtn.addEventListener('click',()=>{
    location.hash='#trends'
});
arrowBtn.addEventListener('click',()=>{
    location.hash = window.history;
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll,false);

function navigator() {
    console.log({ location });

    if(infiniteScroll){
        window.removeEventListener('scroll',infiniteScroll,{passive:false});
        infiniteScroll=undefined;
    }

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    
    }
    window.scroll({
        top: 0,
    });

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, false);
    }

}

function homePage() {
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove('inactive');
    
    searchFormInput.value= '';
    getTrendingMoviesPreview();
    getCategegoriesPreview();
    getLikedMovies();
}

function categoriesPage() {
    console.log('categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.remove('inactive');

    //['#category','id-name']
    const [_,categoryData]=location.hash.split('=') 
    const[categoryId,categoryName]=categoryData.split('-')
    const newname = decodeURI(categoryName)
    headerCategoryTitle.innerHTML=newname;

    getMoviesByCategory(categoryId);

    infiniteScroll=getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
console.log('Movie!!');


headerSection.classList.add('header-container--long');
// headerSection.style.background = '';
arrowBtn.classList.remove('inactive');
arrowBtn.classList.add('header-arrow--white');
headerTitle.classList.add('inactive');
headerCategoryTitle.classList.add('inactive');
searchForm.classList.add('inactive');

trendingPreviewSection.classList.add('inactive');
categoriesPreviewSection.classList.add('inactive');
likedMoviesSection.classList.add('inactive');
genericSection.classList.add('inactive');
movieDetailSection.classList.remove('inactive');
footer.classList.remove('inactive');

//['#movie','23456']
const [_,movieId]=location.hash.split('=') 
getMovieById(movieId)
}

function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    footer.classList.add('inactive');

    //['#search','platzi']
    // const [_, query] = location.hash.split('=');
    let query = location.hash.split('=')[1]
    query = query.replaceAll('%20',' ');
    getMoviesBySearch(query);

    infiniteScroll=getPaginatedMoviesBySearch(query);
}

function trendsPage() {
console.log('TRENDS!!');

headerSection.classList.remove('header-container--long');
headerSection.style.background = '';
arrowBtn.classList.remove('inactive');
arrowBtn.classList.remove('header-arrow--white');
headerTitle.classList.add('inactive');
headerCategoryTitle.classList.remove('inactive');
searchForm.classList.add('inactive');

trendingPreviewSection.classList.add('inactive');
categoriesPreviewSection.classList.add('inactive');
likedMoviesSection.classList.add('inactive');
genericSection.classList.remove('inactive');
movieDetailSection.classList.add('inactive');
footer.classList.remove('inactive');
headerCategoryTitle.innerHTML='Tendencias';

getTrendingMovies();

infiniteScroll = getPaginatedTrendingMovies;
}