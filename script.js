// Função para selecionar a imagem do perfil
function selectProfilePicture() {
    document.getElementById('file-input').click();
}

// Função para alterar a imagem do perfil quando uma nova imagem é selecionada
function changeProfilePicture(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
        var img = document.getElementById('profile-image');
        img.src = event.target.result;

        // Salvar a foto de perfil em cache
        saveProfilePictureToCache(event.target.result);
    };

    reader.readAsDataURL(file);
}

// Função para salvar a foto de perfil em cache
function saveProfilePictureToCache(imageData) {
    localStorage.setItem('cachedProfilePicture', imageData);
}

// Função para carregar a foto de perfil do cache ao iniciar a página
function loadCachedProfilePicture() {
    var cachedImage = localStorage.getItem('cachedProfilePicture');
    if (cachedImage) {
        document.getElementById('profile-image').src = cachedImage;
    }
}

// Chamando a função para carregar a foto de perfil do cache ao iniciar a página
loadCachedProfilePicture();

// Função para ajustar dinamicamente a altura da área de texto
function adjustTextareaHeight() {
    var textarea = document.getElementById("note-content");
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}

// Chamando a função quando a página carregar e sempre que o conteúdo da área de texto mudar
document.addEventListener("DOMContentLoaded", function() {
    adjustTextareaHeight();
    document.getElementById("note-content").addEventListener("input", adjustTextareaHeight);
});

// Função para salvar a nota em cache sempre que for modificada
function saveNoteToCache() {
    var title = document.getElementById('note-title').value.trim();
    var author = document.getElementById('author-name').value.trim();
    var content = document.getElementById('note-content').value.trim();

    var note = {
        title: title,
        author: author,
        content: content
    };

    localStorage.setItem('cachedNote', JSON.stringify(note));
}

// Carregar a nota do cache ao iniciar a página
function loadCachedNote() {
    var cachedNote = localStorage.getItem('cachedNote');
    if (cachedNote) {
        return JSON.parse(cachedNote);
    }
    return null;
}

// Preencher os campos com os dados da nota carregada do cache
function loadPage() {
    var cachedNote = loadCachedNote();

    if (cachedNote) {
        document.getElementById('note-title').value = cachedNote.title || "";
        document.getElementById('author-name').value = cachedNote.author || "";
        document.getElementById('note-content').value = cachedNote.content || "";
    }
}

// Chamando a função para carregar os dados da nota ao iniciar a página
loadPage();

// Adicionar manipuladores de eventos para salvar a nota em cache ao editar os campos
document.getElementById('note-title').addEventListener('input', saveNoteToCache);
document.getElementById('author-name').addEventListener('input', saveNoteToCache);
document.getElementById('note-content').addEventListener('input', saveNoteToCache);

// Função para publicar a nota e gerar um link compartilhável
function publishNote() {
    var title = document.getElementById('note-title').value.trim();
    if (title === "") {
        alert("Por favor, insira um título para a nota.");
        return;
    }

    // Gerar um identificador único para a nota (apenas para simulação)
    var noteId = generateUniqueId(title);

    // Gerar o link de compartilhamento com base no identificador único
    var shareLink = window.location.origin + "/note/" + noteId;

    // Mostrar o link de compartilhamento
    document.getElementById('share-link').innerHTML = "<a href='" + shareLink + "' target='_blank'>Link de Compartilhamento</a>";

    // Salvar a nota em cache
    saveNoteToCache();

    // Redirecionar para a página da nota publicada
    window.location.href = `nota.html?id=${noteId}`;
}

// Função para gerar um ID único baseado no título da nota
function generateUniqueId(noteTitle) {
    // Substituir espaços no título por hífens e converter para minúsculas
    const formattedTitle = noteTitle.toLowerCase().replace(/\s+/g, '-');

    // Adicionar um timestamp para tornar o ID único
    const timestamp = new Date().getTime();

    // Retornar o ID único
    return `${formattedTitle}-${timestamp}`;
}
