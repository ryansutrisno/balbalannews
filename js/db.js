const dbPromised = idb.open("balnews", 1, function (upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "ID",
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.put(team.result);
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
