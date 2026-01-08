let db;

const request = indexedDB.open("orcamentoDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("despesas")) {
        db.createObjectStore("despesas", { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    if (typeof carregarDespesas === "function") {
        carregarDespesas();
    }
};

request.onerror = function() {
    console.log("Erro ao abrir IndexedDB");
};

function salvarDespesa(desc, valor) {
    const tx = db.transaction("despesas", "readwrite");
    tx.objectStore("despesas").add({ descricao: desc, valor: parseFloat(valor) });
}

function listarDespesas(callback) {
    const tx = db.transaction("despesas", "readonly");
    const store = tx.objectStore("despesas");
    const req = store.getAll();
    req.onsuccess = () => callback(req.result || []);
}
