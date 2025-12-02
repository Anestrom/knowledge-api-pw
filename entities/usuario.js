class Usuario {
    constructor(id, nome, email, senha, curso, avaliacao_media, creditos, data_criacao, tipo_usuario) { 
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.curso = curso;
        this.avaliacao_media = avaliacao_media;
        this.creditos = creditos;
        this.data_criacao = data_criacao;
        this.tipo_usuario = tipo_usuario;
    }
}

module.exports = Usuario;
