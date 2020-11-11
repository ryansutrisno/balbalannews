const API_KEY = "e0eb16d8741f4d4e8a6e0d677d73ba28";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_STANDINGS = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAMS_ID =`${BASE_URL}/teams`;
const ENDPOINT_TEAMS = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;

const fetchAPI = (url) => {
  return fetch(url, {
    // mode: "no-cors",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText));
      } else {
        return Promise.resolve(res);
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// loader standing
let standingLoader;
function showStandingLoader() {
  standingLoader = setTimeout(showStanding, 5000);
}

function getStanding() {
  if ("caches" in window) {
    caches.match(ENDPOINT_STANDINGS).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Competition Data: " + data);
          showStanding(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_STANDINGS)
    .then((data) => {
      showStanding(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showStanding(data) {
  document.getElementById("standingLoader").style.display = "none";
  document.getElementById("standing").style.display = "block";
  let standings = "";
  let standingElement = document.getElementById("standing");

  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" width="25px" alt="badge"/></td>
                    <td class="left-align">${standing.team.name}</td>
                    <td class="green-text text-darken-4 center-align">${
                      standing.won
                    }</td>
                    <td class="blue-text center-align">${standing.draw}</td>
                    <td class="red-text center-align">${standing.lost}</td>
                    <td class="brown-text center-align">${standing.points}</td>
                    <td class="purple-text center-align">${
                      standing.goalsFor
                    }</td>
                    <td class="grey-text center-align">${
                      standing.goalsAgainst
                    }</td>
                    <td class="pink-text center-align">${
                      standing.goalDifference
                    }</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
              <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px; border-radius: 7px;">
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th class="green-text center-align">W</th>
                            <th class="blue-text center-align">D</th>
                            <th class="red-text center-align">L</th>
                            <th class="brown-text center-align">P</th>
                            <th class="purple-text center-align">GF</th>
                            <th class="grey-text center-align">GA</th>
                            <th class="pink-text center-align">GD</th>
                        </tr>
                     </thead>
                    <tbody onload="showStandingLoader()" style="margin:0;" id="standings">
                        ${standings}
                    </tbody>
                </table>
              </div>
    `;
}

let teamLoader;
function showTeamLoader() {
  teamLoader = setTimeout(showTeam, 5000);
}

function getTeam() {
  if ("caches" in window) {
    caches.match(ENDPOINT_TEAMS).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Team Data: " + data);
          showTeam(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_TEAMS)
    .then((data) => {
      showTeam(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showTeam(data) {
  document.getElementById("teamLoader").style.display = "none";
  document.getElementById("teams").style.display = "block";
  let teamsElement = "";

  data.teams.forEach(function (team) {
    teamsElement += `
                  <div class="col mb-4">
                      <div class="card-deck">
                        <div class="card text-center" style="width: 18rem;">
                          <img src="${team.crestUrl}" class="card-img-top" style="height: 17.5rem;" alt="${team.name}">
                          <div class="card-body">
                            <p class="h6">${team.name}</p>
                            <a href="./team.html?id=${team.ID}">More Info</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
  });
  document.getElementById("teams").innerHTML = teamsElement;
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(BASE_URL + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            // Menyusun komponen card artikel secara dinamis
            let teamHTML = `
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${data.teams.crestUrl}" />
                    </div>
                    <div class="card-content">
                      <span class="card-title">${data.teams.name}</span>
                      ${snarkdown(data.teams.address)}
                    </div>
                  </div>
                `;

            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchAPI(BASE_URL + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let teamHTML = `
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.teams.crestUrl}" />
                </div>
                <div class="card-content">
                  <span class="card-title">${data.teams.name}</span>
                  ${snarkdown(data.teams.address)}
                </div>
              </div>
            `;

        document.getElementById("body-content").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    teams.forEach(function (team) {
      let description = team.address.substring(0, 100);
      teamsHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (team) {
    teamHTML = "";
    let teamHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.name}</span>
        ${snarkdown(team.address)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}