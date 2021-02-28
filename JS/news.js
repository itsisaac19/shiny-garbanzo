fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=BPJ4P2wkOHJzUtnWnRYBmaKAwh568sHU")
.then((response) => response.json())
.then((data) => {
    console.log(data);

    var newsList = document.querySelector('.newsList'); newsList.innerHTML = '';
    var newsCards = document.getElementsByClassName('newsCard');

    for (i = 0; i < 5; i++) {

        // Assign variables to respective API endpoints
        var title = data.results[i].title;
        var desc = data.results[i].abstract;

        var dateCreated = moment(data.results[i].created_date, "YYYY MM DD").format('MMM DD')  

        // Now we get into the fun of creating elements and assigning the respective variables!

        var card = document.createElement('div'); card.classList.add('newsCard'); card.classList.add('newsNormal')

        var cardTitle = document.createElement('h1'); cardTitle.innerHTML = title; cardTitle.classList.add('newsTitle')
        var cardDate = document.createElement('div'); cardDate.innerHTML = dateCreated; cardDate.classList.add('newsDate')
        var cardDesc = document.createElement('div'); cardDesc.innerHTML = desc; cardDesc.classList.add('newsAbstract')

        card.appendChild(cardTitle)
        card.appendChild(cardDate)
        card.appendChild(cardDesc)

        newsList.appendChild(card)
    }

    for (var cardNum = 0; cardNum < newsCards.length; cardNum ++) {
        (function (cardNum) {
            var newsCards = document.getElementsByClassName('newsCard')
            var urlToArticle = data.results[cardNum].url;

            newsCards[cardNum].addEventListener("click", function(){
                window.open(urlToArticle)
            });
        }(cardNum))
    }

});


