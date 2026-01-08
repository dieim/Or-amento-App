let db;

const request = indexedDB.open("orcamentoDB", 2);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Store de despesas
    if (!db.objectStoreNames.contains("despesas")) {
        const store = db.createObjectStore("despesas", { keyPath: "id", autoIncrement: true });
        store.createIndex("categoria", "categoria", { unique: false });
        store.createIndex("data", "data", { unique: false });
    } else {
        const store = event.target.transaction.objectStore("despesas");

        if (!store.indexNames.contains("categoria")) {
            store.createIndex("categoria", "categoria", { unique: false });
        }
        if (!store.indexNames.contains("data")) {
            store.createIndex("data", "data", { unique: false });
        }
    }

    // Store de categorias personalizadas
    if (!db.objectStoreNames.contains("categorias")) {
        db.createObjectStore("categorias", { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
    if (typeof carregarDespesas === "function") carregarDespesas();
    if (typeof carregarCategorias === "function") carregarCategorias();
};

function salvarDespesa(desc, valor, categoria, data) {
    const tx = db.transaction("despesas", "readwrite");
    tx.objectStore("despesas").add({
        descricao: desc,
        valor: parseFloat(valor),
        categoria,
        data
    });
}

function listarDespesas(callback) {
    const tx = db.transaction("despesas", "readonly");
    const req = tx.objectStore("despesas").getAll();
    req.onsuccess = () => callback(req.result || []);
}

function adicionarCategoria(nome) {
    const tx = db.transaction("categorias", "readwrite");
    tx.objectStore("categorias").add({ nome });
}

function listarCategorias(callback) {
    const tx = db.transaction("categorias", "readonly");
    const req = tx.objectStore("categorias").getAll();
    req.onsuccess = () => callback(req.result || []);
}
