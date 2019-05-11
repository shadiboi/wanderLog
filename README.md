# wanderLog
wanderLog AKA Online Travel Journal (and more..)

  <h1> GameFlow (MVP) </h1>
<ol>
  <li> Home index screen will display other users posts as examples.  The navigation bar you will have a home, about us, login, and register link. Login and register will be a modal.  </li>
  <li> After registrations, user will automatically be redirected to their new profile page.</li>
  <li> Profile page will display all users journal entries in plain text as well as GoogleMaps UI. Navigation bar will change to include links to logout, profile page, explore other people journal entries, and create a new journal entry. </li>


  <li> Key functions: up, down, left, right to control directions of character</li>
  <li> Game objective: cross the streets of Vietnam safely. Only three lives. When you reach the other side you move on to the next level. Speed and volume of motorcyclist will increase as level increase</li> 
  <li> Play page: game UI will be a 7x7 grid.</li> 
        <ol>
          <li>Bottom row will hold character in center position.</li> 
          <li> Following four rows will be "traffic zone" where cyclist wil be moving right to left at different speeds. </li> <li> Top row will be "safe zone", however only three of seven blocks will allow player to level up. Other four will kill player. </li> 
          <li> Top row will display stats including players lives and current level. </li>
    </ol>
 <li> Landing on "safe house" will invoke next level and render new position with new level displayed</li>
 <li> Difficulty (speed/volume) will increase as levels increase.</li>
  <li> If player loses all THREE lives, game ends</li>
  </ol>
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