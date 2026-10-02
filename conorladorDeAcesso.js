// CLASSE BASE:
class EtapaProcesso{
    constructor(){
        this.proximaEtapa = null;
    }

    setProximaEtapa(proximaEtapa){
        this.proximaEtapa = proximaEtapa;
    }

    processar(acesso){
        throw new Error("Este metodos deve ser implementado pela subclasses");
    }
}

// ETAPAS CONCRETAS:
class EtapaConexao extends EtapaProcesso{
    processar(acesso){
        console.log("Estabelecendo conexao...");
        // Logica da Conexao
        if(true){ // Supondo que a conexao foi bem sucedida
            console.log("Conexao Estabelecida.");
            if (this.proximaEtapa){
                this.proximaEtapa.processar(acesso);
            }
        } else {
            console.log("Falha na Conexao.. Processo Encerrado..")
        }
    }
}

class EtapaValidacao extends EtapaProcesso{
    processar(acesso){
        console.log("Validando informacoes do acesso ...");
        // Logica de Validacao
        if(acesso.cargo === 'estudante' || acesso.cargo === 'professor' || acesso.cargo === 'diretor' || acesso.cargo === 'visitante' ){
            console.log("Informacoes Validas...");
            if(this.proximaEtapa){
                this.proximaEtapa.processar(acesso);
            } 
        }else {
                console.log("Informacoes Invalidas ... Processo Encerrado...");
            }
    }
}

class EtapaEnvioInformacao extends EtapaProcesso{
    processar(acesso){
        console.log("Enviando informações do acesso...");
        // Logica do Envio da Informacoes
        console.log("Informacoes Enviadas");
        if(this.proximaEtapa){
            this.proximaEtapa.processar(acesso);
        }
    }
}

class EtapaAutenticacao extends EtapaProcesso{
    processar(acesso){
        console.log("Autenticando acesso...");
        // Logica de Autenticacao
        if(true){ // Supondo que a autenticacao foi bem sucedida
            console.log("Acesso Autenticado");
            if(this.proximaEtapa){
                this.proximaEtapa.processar(acesso);
            } else {
                console.log("Autenticacao Falhou... Processo Encerrado.");
            }
        }
    }
}

class EtapaConfirmacao extends EtapaProcesso{
    processar(acesso){
        console.log("Confirmando Acesso...");
        // Logica de Confirmacao
        console.log("Acesso Confirmado com Sucesso");
    }
}

// OBJETO ACESSO:
class Acesso{
    constructor(cargo){
        this.cargo = cargo;
        // Outros dados relevantes
    }
}

// CLIENTE
class Cliente{
    iniciarAcesso(valor){
        // Criar das Etapas:
        const etapaConexao = new EtapaConexao();
        const etapaValidacao = new EtapaValidacao();
        const etapaEnvioInformacao = new EtapaEnvioInformacao();
        const etapaAutenticacao = new EtapaAutenticacao();
        const etapaConfirmacao = new EtapaConfirmacao();

        // Configuracao da Cadeia (Sequencia das Etapas):
        etapaConexao.setProximaEtapa(etapaValidacao);
        etapaValidacao.setProximaEtapa(etapaEnvioInformacao);
        etapaEnvioInformacao.setProximaEtapa(etapaAutenticacao);
        etapaAutenticacao.setProximaEtapa(etapaConfirmacao);

        // Criacao do Pagamento
        const acesso = new Acesso(valor);

        // Inicio do Processo
        etapaConexao.processar(acesso);
    }
}


// USO DO PADRAO:
const cliente = new Cliente();
cliente.iniciarAcesso('estudante'); // Inicia o proc pagamento de R$ 100,0
