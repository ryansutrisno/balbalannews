const dbPromised = idb.open("balnews", 1, function (upgradeDb) {
  console.log('upgradeDb =>', upgradeDb)
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  console.log('team object store =>', teamsObjectStore)
  teamsObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

function saveForLater(team) {
  console.log('teams =>', team)
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log('save team by id =>',team);
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team kesayangan berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      });
  });
}
