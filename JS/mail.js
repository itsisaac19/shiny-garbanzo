 // Client ID and API key from the Developer Console
 var CLIENT_ID =
 "349499624770-adq0l3rtv6ob0rtlgp0v2cukvdvohd8c.apps.googleusercontent.com";
var API_KEY = "AIzaSyDSH-xCCAozCyUmAz_KBHrlJCK2fMjC9qg";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
 "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
 gapi.load("client:auth2", initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
 gapi.client
   .init({
     apiKey: API_KEY,
     clientId: CLIENT_ID,
     discoveryDocs: DISCOVERY_DOCS,
     scope: SCOPES
   })
   .then(
     function () {
       // Listen for sign-in state changes.
       gapi.auth2
         .getAuthInstance()
         .isSignedIn.listen(updateSigninStatus);

       // Handle the initial sign-in state.
       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
       authorizeButton.onclick = handleAuthClick;
       signoutButton.onclick = handleSignoutClick;
       console.log('wowNice')
     },
     function (error) {
       console.log(JSON.stringify(error, null, 2));
     }
   );
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
 if (isSignedIn) {
   authorizeButton.style.display = "none";
   signoutButton.style.display = "block";
   listLabels();
 } else {
   authorizeButton.style.display = "block";
   signoutButton.style.display = "none";
   document.querySelector('.emailList').innerHTML = ''
 }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
 gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
 gapi.auth2.getAuthInstance().signOut();
 document.querySelector('.emailList').innerHTML = ''
}

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {

}

/**
* Print all Labels in the authorized user's inbox. If no labels
* are found an appropriate message is printed.
*/
function listLabels() {
 gapi.client.gmail.users.messages
   .list({
     userId: "me",
     "includeSpamTrash": false,
     "maxResults": 20
   })

   .then(function(response) {
     // Handle the results here (response.result has the parsed body).
     //console.log("Response", response);

     var main = response.result.messages;

     for(i = 0; i < 8; i++) {
         var idList = main[i].id;

         gapi.client.gmail.users.messages
             .get({
                 userId: "me",
                 "id": idList,
                 "format": "full"
             })
             .then(function(response) {
                 // Handle the results here (response.result has the parsed body).
                 //console.log("Email", response);

                  // Assign variables to respective API endpoints
                 var id = response.result.id;
                 var emailSnippet = response.result.snippet + '....';

                 var emailSubject;
                 for(var headerCheck = 0; headerCheck < response.result.payload.headers.length; headerCheck++) {
                    if (response.result.payload.headers[headerCheck].name == "Subject" ) {
                      emailSubject = response.result.payload.headers[headerCheck].value
                    } 
                 }

                 var utcOffset = Math.abs(moment().utcOffset())
                 var emailDate = moment(response.headers.date, "ddd DD MMM YYYY").subtract(utcOffset, 'minutes').format('MMM DD')

                 var emailList = document.querySelector('.emailList'); 
                 var emailCards = document.getElementsByClassName('email');

                  // Now we get into the fun of creating elements and assigning the respective variables!
          
                  var card = document.createElement('div'); card.classList.add('email'); card.classList.add('emailNormal')
          
                  var cardTitle = document.createElement('h1'); cardTitle.innerHTML = emailSubject; cardTitle.classList.add('emailTitle')
                  var cardDate = document.createElement('div'); cardDate.innerHTML = emailDate; cardDate.classList.add('emailDate')
                  var cardDesc = document.createElement('div'); cardDesc.innerHTML = emailSnippet; cardDesc.classList.add('emailSnippet')

                  card.appendChild(cardTitle)
                  card.appendChild(cardDate)
                  card.appendChild(cardDesc)
          
                  emailList.appendChild(card)
                  //console.log(emailList)
              
                  for (var cardNum = 0; cardNum < emailCards.length; cardNum ++) {
                    (function (cardNum) {
                        emailCards[cardNum].addEventListener("click", function(){
                          var gmailUrl = 'https://mail.google.com/mail/u/0/#inbox/' + id
                            window.open(gmailUrl)
                        });
                    }(cardNum))
                  }
             },
             function(err) { console.error("Execute error", err); });
     }


       },
       function(err) { console.error("Execute error", err); });


}


setTimeout(function() {
  handleClientLoad();
  console.log('noWow')
}, 1000)