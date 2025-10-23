class Chamado {
    constructor(id, id_aprendiz, id_mentor, id_materia, localizacao, duvida_detalhes, status, data_abertura, data_fechamento) {
        this.id = id;
        this.id_aprendiz = id_aprendiz;
        this.id_mentor = id_mentor; 
        this.id_materia = id_materia;
        this.localizacao = localizacao;
        this.duvida_detalhes = duvida_detalhes;
        this.status = status; // 'Aberto', 'Aceito', 'Finalizado', 'Cancelado'
        this.data_abertura = data_abertura;
        this.data_fechamento = data_fechamento;
    }
}

module.exports = Chamado;