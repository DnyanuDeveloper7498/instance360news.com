const API_KEY="36e9f426a1564667acf6b971f06fb124";
const url="https://newsapi.org/v2/everything?q=";


window.addEventListener('load',()=>fetchNews("india"));

async function fetchNews(query)
{
  const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data=await res.json();
  bindData(data.articles); 

    //push new state to history

     history.pushState({ query }, "", `?query=${query}`);

}

function bindData(articles)
{
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    
    cardsContainer.innerHTML="";

    articles.forEach((article) =>{

        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
       
        fillDataInCard(cardClone,article);

        cardsContainer.appendChild(cardClone);



       
    });   
}

  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    let date = new Date(article.publishedAt);
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
        // If valid, convert to the desired timezone
        date = date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        newsSource.innerHTML = `${article.source.name} . ${date}`;
    } else {
        // If invalid, handle accordingly (e.g., display a default date)
        newsSource.innerHTML = `${article.source.name} . Invalid Date`;
    }

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}
    
          function onNavItemClick(id)
          {
            scrollToTop();
              fetchNews(id);
             
          }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Smooth scrolling animation
            });
        }
        
       
        const searchButton=document.getElementById('search-button');
        const searchText = document.getElementById('search-input');
        
         searchButton.addEventListener('click',() =>
         {
            const query=searchText.value;
            if(!query) return;
            fetchNews(query);

         });

// Add event listener for Enter key press
searchText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
    }
});

window.addEventListener('popstate', (event) => {
      const query = event.state ? event.state.query : "india"; // Default to "india" if no state is available
      fetchNews(query);
  });

document.addEventListener("DOMContentLoaded", function() {
        var icon = document.getElementById('icon');
        var logo = document.getElementById('logo');
        var theme = localStorage.getItem('theme');
      
        // Set initial theme
        if (theme === 'dark') {
          document.body.classList.add('dark-theme');
          icon.src = "sun.png";
        }
      
        // Toggle theme
        icon.onclick = function() {
          document.body.classList.toggle('dark-theme');
          if (document.body.classList.contains('dark-theme')) {
            icon.src = "sun.png";
            localStorage.setItem('theme', 'dark');
          } else {
            icon.src = "moon.png";
            localStorage.setItem('theme', 'light');
          }
        };
      
        // Check for reload and apply theme
        if (theme === 'dark') {
          document.body.classList.add('dark-theme');
          icon.src = "sun.png";
        }
      });
      function reloadPage() {
            
              location.reload();
          }


function goBackInHistory() {
    window.history.back();
}

// login page 
var log= document.getElementById("login-from");
var cre_aco = document.getElementById("creat-account");

function login_first()
{
 log.style.display="block";
 cre_aco.style.display="none";
}

function close_log()
{
  log.style.display="none";
}

//creat-account 

function creat_log()
{
  cre_aco.style.display="block";
  log.style.display="none";
}
 function creat_close()
 {
  cre_aco.style.display="none";
 }


