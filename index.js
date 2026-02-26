//=======Constants======
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2601-FTB-CT-WEB-PT"; // Make sure to change this! **done**
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;
//=====State=====
let parties = [];
let selectedParty;

//get entire list of parties from API
async function getParties() {
  // TODO
  const fetchAllParties = await fetch(`${API}`);
  const partiesResults = await fetchAllParties.json();
  parties = partiesResults.data;
  render();
}

async function getParty(id) {
  // TODO
  const fetchOneParty = await fetch(`${API}/${id}`);
  const partyResults = await fetchOneParty.json();
  selectedParty = partyResults.data;
  
  render();  
}

/** Artist name that shows more details about the artist when clicked */
function PartyListItem(party) {
  // TODO
  const $li = document.createElement('li');
  $li.innerHTML = `
    <li><a href="#selected">${party.name}</a></li>
  `;
  $li.addEventListener('click', (event => {
    getParty(party.id);
  }));
  return $li;
}

/** A list of names of all artists */
function PartyList() {
  // TODO  
  const $ul = document.createElement('ul');
  $ul.classList.add("lineup");
  const $partyListItem = parties.map((party => {
    return PartyListItem(party);
  }));
  $ul.replaceChildren(...$partyListItem);
  return $ul;
}

/** Detailed information about the selected artist */
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  // TODO

  const $section = document.createElement('section');
  $section.innerHTML = `
    <section class="artist">
        <h3>${selectedParty.name}  #${selectedParty.id}</h3>
        <p>Date: ${new Date(selectedParty.date).toDateString()}</p>
        <p>Location: ${selectedParty.location}</p>
        <p>${selectedParty.description}</p>
        <ul>
            
        </ul>
   </section>
  `;
  return $section;
}


// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <ArtistList></ArtistList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <ArtistDetails></ArtistDetails>
      </section>
    </main>
  `;
  $app.querySelector("ArtistList").replaceWith(PartyList());
  $app.querySelector("ArtistDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();