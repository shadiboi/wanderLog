# wanderLog
wanderLog AKA Online Travel Journal (and more..)

  <h1> UserFlow (MVP) </h1>
<ol>
  <li> Home index screen will display other users posts as examples.  The navigation bar you will have a home, about us, login, and register link. Login and register will be a modal.  </li>
  <li> After registrations, user will automatically be redirected to their new profile page.</li>
  <li> Profile page will display all users journal entries in plain text as well as GoogleMaps UI. Navigation bar will change to include links to logout, profile page, explore other people journal entries, and create a new journal entry. </li>
  <li> When user clicks on the entry displayed on Google Maps, it will take him the entry show page OR will show short decription of </li>

  <h2>Models</h2>
  <ul> 
  <li> "User" model:</li> 
          <ol>
              <li>username: String, required, unique</li> 
              <li> password: String, requrired</li>
              <li> email: String</li>
          </ol>
<li> "Entries" model: </li>
        <ol>
            <li>title: String, required</li> 
            <li> description: String/li>
            <li> location: Number</li>
            <li> photos:  Array OR (one) photo: String</li>
        </ol>
  <h1> Bonus: </h1>
  <ul> 
    <li>Link to search flights on SkyScanner API</li>
     <li> Facebook API to share entries</li>
    <li>Upload multiple photos</li>
  </ul>