let editandoId = null; // ID do usuário em edição 

document.getElementById('formCadastro').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('id').value;
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (editandoId === null) {
    // Verifica duplicação de ID
    if (usuarios.find(u => u.id === id)) {
      mostrarErro(`Erro: o ID "${id}" já está cadastrado.`);
      return;
    }

    usuarios.push(obterUsuarioDoFormulario());
  } else {
    // Atualiza os dados do usuário existente
    usuarios = usuarios.map(u => u.id === editandoId ? obterUsuarioDoFormulario() : u);
    editandoId = null;
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  mostrarUsuarios();
  this.reset();
});

function obterUsuarioDoFormulario() {
  return {
    id: document.getElementById('id').value,
    nome: document.getElementById('nome').value,
    senha: document.getElementById('senha').value,
    peso: document.getElementById('peso').value,
    altura: document.getElementById('altura').value,
    idade: document.getElementById('idade').value
  };
}

function mostrarUsuarios() {
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach(u => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap';
    li.innerHTML = `
      <span>ID: ${u.id} | Nome: ${u.nome} | Peso: ${u.peso}kg | Altura: ${u.altura}m | Idade: ${u.idade}</span>
      <div class="mt-2 mt-sm-0">
        <button class="btn btn-sm btn-warning me-2" onclick="editarUsuario('${u.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirUsuario('${u.id}')">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function editarUsuario(id) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.id === id);

  if (usuario) {
    document.getElementById('id').value = usuario.id;
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('senha').value = usuario.senha;
    document.getElementById('peso').value = usuario.peso;
    document.getElementById('altura').value = usuario.altura;
    document.getElementById('idade').value = usuario.idade;
    editandoId = id;
  }
}

function excluirUsuario(id) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios = usuarios.filter(u => u.id !== id);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  mostrarUsuarios();
}

// --- Modo Escuro com troca de ícone 🌙/☀️ ---
document.addEventListener('DOMContentLoaded', () => {
  mostrarUsuarios();

  const toggleBtn = document.getElementById('toggleDarkMode');
  const body = document.body;

  // Aplica modo escuro salvo anteriormente
  if (localStorage.getItem('modo') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('modo', isDark ? 'dark' : 'light');
  });
});

// --- Funções para exibir e fechar a janela de erro ---
function mostrarErro(mensagem) {
  const janela = document.getElementById('janelaErro');
  const texto = document.getElementById('textoErro');
  texto.textContent = mensagem;
  janela.style.display = 'block';
}

function fecharErro() {
  document.getElementById('janelaErro').style.display = 'none';
}
