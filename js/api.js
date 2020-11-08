//const base_url = "https://api.football-data.org/v2/";

// function status(response) {
//   if (response.status !== 200) {
//     console.log("Error : " + response.status);
//     return Promise.reject(new Error(response.statusText));
//   } else {
//     return Promise.resolve(response);
//   }
// }

// function json(response) {
//   return response.json();
// }

// function error(error) {
//   console.log("Error : " + error);
// }

// function getMatches() {
//   if ("caches" in window) {
//     caches.match(base_url + "matches").then(function (response) {
//       if (response) {
//         response.json().then(function (data) {
//           let articlesHTML = "";
//           data.result.forEach(function (article) {
//             articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.id}">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.thumbnail}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${article.title}</span>
//                       <p>${article.description}</p>
//                     </div>
//                   </div>
//                 `;
//           });
//           // Sisipkan komponen card ke dalam elemen dengan id #content
//           document.getElementById("articles").innerHTML = articlesHTML;
//         });
//       }
//     });
//   }

//   fetch(base_url + "articles")
//     .then(status)
//     .then(json)
//     .then(function (data) {
//       // Objek/array JavaScript dari response.json() masuk lewat data.
//       // Menyusun komponen card artikel secara dinamis
//       let articlesHTML = "";
//       data.result.forEach(function (article) {
//         articlesHTML += `
//               <div class="card">
//                 <a href="./article.html?id=${article.id}">
//                   <div class="card-image waves-effect waves-block waves-light">
//                     <img src="${article.thumbnail}" />
//                   </div>
//                 </a>
//                 <div class="card-content">
//                   <span class="card-title truncate">${article.title}</span>
//                   <p>${article.description}</p>
//                 </div>
//               </div>
//             `;
//       });
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("articles").innerHTML = articlesHTML;
//     })
//     .catch(error);
// }

// function getArticleById() {
//   return new Promise(function (resolve, reject) {
//     // Ambil nilai query parameter (?id=)
//     let urlParams = new URLSearchParams(window.location.search);
//     let idParam = urlParams.get("id");

//     if ("caches" in window) {
//       caches.match(base_url + "article/" + idParam).then(function (response) {
//         if (response) {
//           response.json().then(function (data) {
//             console.log(data);
//             // Menyusun komponen card artikel secara dinamis
//             let articleHTML = `
//                   <div class="card">
//                     <div class="card-image waves-effect waves-block waves-light">
//                       <img src="${data.result.cover}" />
//                     </div>
//                     <div class="card-content">
//                       <span class="card-title">${data.result.post_title}</span>
//                       ${snarkdown(data.result.post_content)}
//                     </div>
//                   </div>
//                 `;

//             document.getElementById("body-content").innerHTML = articleHTML;
//             // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
//             resolve(data);
//           });
//         }
//       });
//     }

//     fetch(base_url + "article/" + idParam)
//       .then(status)
//       .then(json)
//       .then(function (data) {
//         console.log(data);
//         // Menyusun komponen card artikel secara dinamis
//         let articleHTML = `
//               <div class="card">
//                 <div class="card-image waves-effect waves-block waves-light">
//                   <img src="${data.result.cover}" />
//                 </div>
//                 <div class="card-content">
//                   <span class="card-title">${data.result.post_title}</span>
//                   ${snarkdown(data.result.post_content)}
//                 </div>
//               </div>
//             `;

//         document.getElementById("body-content").innerHTML = articleHTML;
//         // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
//         resolve(data);
//       });
//   });
// }

// function getSavedArticles() {
//   getAll().then(function (articles) {
//     console.log(articles);
//     // Menyusun komponen card artikel secara dinamis
//     let articlesHTML = "";
//     articles.forEach(function (article) {
//       let description = article.post_content.substring(0, 100);
//       articlesHTML += `
//                   <div class="card">
//                     <a href="./article.html?id=${article.ID}&saved=true">
//                       <div class="card-image waves-effect waves-block waves-light">
//                         <img src="${article.cover}" />
//                       </div>
//                     </a>
//                     <div class="card-content">
//                       <span class="card-title truncate">${article.post_title}</span>
//                       <p>${description}</p>
//                     </div>
//                   </div>
//                 `;
//     });
//     // Sisipkan komponen card ke dalam elemen dengan id #body-content
//     document.getElementById("body-content").innerHTML = articlesHTML;
//   });
// }

// function getSavedArticleById() {
//   let urlParams = new URLSearchParams(window.location.search);
//   let idParam = urlParams.get("id");

//   getById(idParam).then(function (article) {
//     articleHTML = "";
//     let articleHTML = `
//     <div class="card">
//       <div class="card-image waves-effect waves-block waves-light">
//         <img src="${article.cover}" />
//       </div>
//       <div class="card-content">
//         <span class="card-title">${article.post_title}</span>
//         ${snarkdown(article.post_content)}
//       </div>
//     </div>
//   `;
//     // Sisipkan komponen card ke dalam elemen dengan id #content
//     document.getElementById("body-content").innerHTML = articleHTML;
//   });
// }

// function getById(id) {
//   return new Promise(function (resolve, reject) {
//     dbPromised
//       .then(function (db) {
//         let tx = db.transaction("articles", "readonly");
//         let store = tx.objectStore("articles");
//         return store.get(id);
//       })
//       .then(function (article) {
//         resolve(article);
//       });
//   });
// }

const API_KEY = "e0eb16d8741f4d4e8a6e0d677d73ba28";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;
const TEAM_ID = 61;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_SCHEDULED_TEAM =`${BASE_URL}teams/${TEAM_ID}/matches?status=SCHEDULED`;
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

// loader
let loader;
function showLoader() {
  loader = setTimeout(showStanding, 5000);
  loader = setTimeout(showSchedule, 5000);
}

function getAllStandings() {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Competition Data: " + data);
          showStanding(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then((data) => {
      showStanding(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showStanding(data) {
  document.getElementById("loader").style.display = "none";
  document.getElementById("homeStanding").style.display = "block";
  let standings = "";
  let standingElement = document.getElementById("homeStanding");

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
                    <tbody onload="showLoader()" style="margin:0;" id="standings">
                        ${standings}
                    </tbody>
                </table>
              </div>
    `;
}

function getAllSchedules() {
  if ("caches" in window) {
    caches.match(ENDPOINT_SCHEDULED_TEAM).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Schedule Data: " + data);
          showSchedule(data);
        });
      }
    });
  }

  fetchAPI(ENDPOINT_SCHEDULED_TEAM)
    .then((data) => {
      showSchedule(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showSchedule(data) {
  document.getElementById("loader").style.display = "none";
  document.getElementById("homeSchedule").style.display = "block";
  let schedules = "";
  let scheduleElement = document.getElementById("homeSchedule");

  data.schedules.matches[0].forEach(function (schedule) {
    schedules += `
                <tr>
                    <td class="left-align">${schedule.utcDate}</td>
                    <td class="green-text text-darken-4 center-align">${
                      schedule.stage
                    }</td>
                    <td class="blue-text center-align">${schedule.group}</td>
                    <td class="red-text center-align">${schedule.matchday}</td>
                    <td class="brown-text center-align">${schedule.homeTeam.name}</td>
                    <td>vs</td>
                    <td class="purple-text center-align">${
                      schedule.awayTeam.name
                    }</td>
                    <td class="grey-text center-align">${
                      schedule.competition.name
                    }</td>
                    <td class="pink-text center-align">${
                      schedule.competition.area.name
                    }</td>
                </tr>
        `;
  });

  scheduleElement.innerHTML = `
              <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px; border-radius: 7px;">
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Time Match</th>
                            <th class="green-text center-align">Stage</th>
                            <th class="blue-text center-align">Group</th>
                            <th class="red-text center-align">Matchday</th>
                            <th class="brown-text center-align">Home</th>
                            <th class="purple-text center-align"></th>
                            <th class="grey-text center-align">Away</th>
                            <th class="pink-text center-align">Competition Name</th>
                            <th class="pink-text center-align">Area</th>
                        </tr>
                     </thead>
                    <tbody style="margin:0;" id="standings">
                        ${schedules}
                    </tbody>
                </table>
              </div>
    `;
}



// function getAllTeams() {
//   if ("caches" in window) {
//     caches.match(ENDPOINT_TEAMS).then(function (response) {
//       if (response) {
//         response.json().then(function (data) {
//           console.log("Team Data: " + data);
//           showTeam(data);
//         });
//       }
//     });
//   }

//   fetchAPI(ENDPOINT_TEAMS)
//     .then((data) => {
//       showTeam(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// function showTeam(data) {
//   let teams = "";
//   let teamElement = document.getElementById("showTeams");
//   // const teams = document.getElementById("showTeams");
//   // const teamElement = document.getElementById("showTeams");
//   // teams.innerHTML = "";
//   data.teams.forEach(function (team) {
//   // teams += `
//   //   <div class="col sm-6">
//   //     <div class="card">
//   //       <img src="${team.crestUrl}" class="card-img-top" width="60px" height="60px" alt="${team.name}">
//   //       <div class="card-body">
//   //         <h5 class="card-title">${team.name}</h5>
//   //           <ul class="list-group list-group-flush">
//   //             <li class="list-group-item text-wrap">Address : ${team.address}</li>
//   //             <li class="list-group-item text-wrap">Website : ${team.website}</li>
//   //           </ul>
//   //       </div>
//   //     </div>
//   //   </div>`;
//   // });
//   // teamElement.innerHTML = `
//   //   <div class="row" id="teams">
//   //     ${teams}
//   //   </div>`;

//     teamElement.innerHTML = `
//         <div class="col sm-6">
//         <div class="card">
//           <img src="${team.crestUrl}" class="card-img-top" width="60px" height="60px" alt="${team.name}">
//           <div class="card-body">
//             <h5 class="card-title">${team.name}</h5>
//               <ul class="list-group list-group-flush">
//                 <li class="list-group-item text-wrap">Address : ${team.address}</li>
//                 <li class="list-group-item text-wrap">Website : ${team.website}</li>
//               </ul>
//           </div>
//         </div>
//       </div>
//     `;
//   });
// }
