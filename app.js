// Verifica login simples
if (location.pathname.endsWith("index.html") || location.pathname === "/" ) {
    if (localStorage.getItem("logado") !== "true") {
        window.location.href = "login.html";
    }
}

// Registrar Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

// Tema escuro/claro (opcional: você pode adicionar um botão depois)
function ativarTemaEscuro(ativo) {
    if (ativo) {
        document.getElementById("tema-dark").disabled = false;
    } else {
        document.getElementById("tema-dark").disabled = true;
    }
}

// Funções de despesas (usadas no index.html)
function adicionar() {
    const desc = document.getElementById("descricao").value;
    const val = document.getElementById("valor").value;

    if (!desc || !val) {
        alert("Preencha todos os campos");
        return;
    }

    salvarDespesa(desc, val);
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";

    if (typeof carregarDespesas === "function") {
        carregarDespesas();
    }
}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

function ativarTemaEscuro(ativo) {
    document.getElementById("tema-dark").disabled = !ativo;
}

