function abrirCurso(curso) {

    const cursosInfo = {
        "ADS": "Análise e Desenvolvimento de Sistemas: Capacitação em desenvolvimento de software e análise de sistemas.",

        "Eletronica Automotiva": "Eletrônica Automotiva: Enfoque na eletrônica aplicada à indústria automotiva.",

        "Logística": "Logística: Gestão e otimização de recursos e processos logísticos.",

        "Gestão Empresarial": "Gestão Empresarial: Estratégias de gestão e implementação de planos de negócios.",

        "Gestão de Qualidade": "Gestão de Qualidade: Garantia e aprimoramento da qualidade nas operações.",

        "Manufatura Avançada": "Manufatura Avançada: Projetos e desenvolvimento na era da Indústria 4.0.",

        "Polímeros": "Polímeros: Fabricação e aplicação de compostos químicos, como o plástico.",
    };

    const largura = 600;

    const altura = 300;

    const left = (screen.width / 2) - (largura / 2);

    const top = (screen.height / 2) - (altura / 2);

    const novaJanela = window.open("", "_blank", `width=${largura},height=${altura},top=${top},left=${left}`);

    novaJanela.document.write(`

    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Informações do Curso</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 800px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
                background-image: linear-gradient(45deg, rgb(20, 222, 124) 0%, rgb(20, 222, 124) 21%,rgb(25, 190, 119) 21%, rgb(25, 190, 119) 37%,rgb(30, 158, 113) 37%, rgb(30, 158, 113) 46%,rgb(35, 126, 108) 46%, rgb(35, 126, 108) 53%,rgb(39, 94, 103) 53%, rgb(39, 94, 103) 59%,rgb(44, 62, 97) 59%, rgb(44, 62, 97) 77%,rgb(49, 30, 92) 77%, rgb(49, 30, 92) 100%);
            }
            p {
                color: #666;
                text-align: center;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <h1>${curso}</h1>
        <p>Descrição: ${cursosInfo[curso]}</p>
    </div>
    
    </body>
    </html>
    

    `);

}

function confirmarAbertura(curso) {

    const confirmacao = confirm(`Você quer abrir as informações sobre o curso ${curso}?`);

    if (confirmacao) {

        abrirCurso(curso);

    }

}

function selecionarCurso() {

    const cursoSelecionado = document.getElementById("cursos").value;

    if (cursoSelecionado !== "") {

        confirmarAbertura(cursoSelecionado);

    }

}