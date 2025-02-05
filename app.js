let amigos = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nome = inputAmigo.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }
    
    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    inputAmigo.value = "";
}

function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.onclick = () => removerAmigo(index);
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.style.cursor = "pointer";
        
        li.appendChild(botaoRemover);
        listaAmigos.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos 2 participantes para o sorteio.");
        return;
    }
    
    let sorteio = {};
    let amigosDisponiveis = [...amigos];
    
    amigos.forEach(amigo => {
        let possiveis = amigosDisponiveis.filter(a => a !== amigo);
        if (possiveis.length === 0) {
            sortearAmigo(); // Reexecuta caso algum erro de emparelhamento aconteça
            return;
        }
        let sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio[amigo] = sorteado;
        amigosDisponiveis = amigosDisponiveis.filter(a => a !== sorteado);
    });

    exibirResultado(sorteio);
}

function exibirResultado(sorteio) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    for (const [amigo, sorteado] of Object.entries(sorteio)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteado}`;
        resultado.appendChild(li);
    }
}
