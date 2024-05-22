document.addEventListener("DOMContentLoaded", () => {
    const forms = document.getElementById("forms");
    const listaEstudante = document.getElementById("listaEstudante");
    const mediaDiv = document.getElementById("media");
    const estudante = [];

    forms.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const ra = document.getElementById("ra").value.trim();
        const nota1 = parseFloat(document.getElementById("nota1").value);
        const nota2 = parseFloat(document.getElementById("nota2").value);
        const nota3 = parseFloat(document.getElementById("nota3").value);

        if (!validarNome(nome)) {
            alert("Nome Completo deve conter pelo menos um nome e um sobrenome.");
            return;
        }
        if (!validarRA(ra)) {
            alert("RA deve ter exatamente 5 dígitos.");
            return;
        }
        if (!validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
            alert("As notas devem estar entre 0 e 10.");
            return;
        }

        const media = (nota1 + nota2 + nota3) / 3;
        estudante.push({ nome, ra, media });

        mostrarEstudante();

        if (estudante.length === 10) {
            mostrarTodos();
        }

        forms.reset();
    });

    function validarNome(nome) {
        return nome.split(' ').length > 1;
    }

    function validarRA(ra) {
        return /^[0-9]{5}$/.test(ra);
    }

    function validarNota(grade) {
        return grade >= 0 && grade <= 10;
    }

    function mostrarEstudante() {
        listaEstudante.innerHTML = estudante.map(aluno =>
            `<p>Nome: ${aluno.nome}, RA: ${aluno.ra}, Média: ${aluno.media.toFixed(2)}</p>`
        ).join('');
    }

    function mostrarTodos() {
        const overallmedia = estudante.reduce((sum, aluno) => sum + aluno.media, 0) / estudante.length;
        mediaDiv.innerHTML = `Média Geral: ${overallmedia.toFixed(2)}`;
    }
});