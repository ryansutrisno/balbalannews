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
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team kesayangan berhasil di simpan.");
    })
    .catch(function () {
      console.error("Team kesayangan gagal di simpan.");
    })
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
  console.log('id =>', id)
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(Number(id));
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function deleteTeamById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
    .then(function (db) {
        let tx =  db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function () {
        resolve(true)
        console.log('Team kesayangan berhasil di hapus');
      })
      .catch(function() {
        console.error('Team gagal dihapus');
      })
  })
}