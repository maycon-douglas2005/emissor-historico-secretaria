

        function carregarExcel() {

            const arquivo =
                document.getElementById("arquivoExcel").files[0];

            if (
                !arquivo.name.toLowerCase().endsWith(".xlsx") &&
                !arquivo.name.toLowerCase().endsWith(".xls")
            ) {
                alert("Selecione um arquivo Excel (.xls ou .xlsx)");
                return;
            }

            if (!arquivo) {
                alert("Selecione um arquivo Excel.");
                return;
            }

            if (typeof XLSX === "undefined") {
                alert("Biblioteca XLSX não carregada.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {

                try {

                    const data = new Uint8Array(e.target.result);

                    const workbook = XLSX.read(data, {
                        type: "array"
                    });

                    console.log(workbook.SheetNames);

                    if (workbook.SheetNames.length < 2) {
                        alert("O arquivo deve possuir pelo menos 2 abas.");
                        return;
                    }

                    const abaAluno =
                        workbook.Sheets[workbook.SheetNames[0]];

                    const abaDisciplinas =
                        workbook.Sheets[workbook.SheetNames[1]];

                    const dadosAluno =
                        XLSX.utils.sheet_to_json(abaAluno);

                    const disciplinas =
                        XLSX.utils.sheet_to_json(abaDisciplinas);

                    preencherAluno(dadosAluno[0]);
                    preencherHistorico(disciplinas);

                    alert("Importação concluída!");

                } catch (erro) {

                    console.error(erro);
                    alert("Erro ao importar: " + erro.message);

                }

            };

            reader.readAsArrayBuffer(arquivo);
        }

        function preencherAluno(aluno) {

            document.getElementById("cgm").innerText =
                aluno.CGM || "";

            document.getElementById("aluno").innerText =
                aluno.ALUNO || "";

            document.getElementById("curso").innerText =
                aluno.CURSO || "";

            document.getElementById("titulacao").innerText =
                aluno.TITULACAO || "";

            document.getElementById("nascimento").innerText =
                aluno.NASCIMENTO || "";

            document.getElementById("cargaHoraria").innerText =
                (aluno.CARGA_HORARIA || 0) + " horas";


            // PAGINA 2

            document.getElementById("cgm2").innerText =
                aluno.CGM || "";

            document.getElementById("aluno2").innerText =
                aluno.ALUNO || "";

            document.getElementById("rguf2").innerText =
                aluno.RG_UF || "";

            document.getElementById("estudos2").innerHTML =
                aluno.ESTUDOS_REALIZADOS || "";

            document.getElementById("observacoes2").innerHTML =
                aluno.OBSERVACOES || "";

            document.getElementById("certificado2").innerHTML =
                aluno.CERTIFICADO || "";

            document.getElementById("data2").innerText =
                aluno.DATA_CERTIFICADO || "";

            document.getElementById("secretaria2").innerHTML =
                aluno.SECRETARIA || "";

            document.getElementById("diretora2").innerHTML =
                aluno.DIRETORA || "";

            document.getElementById("responsavel2").innerText =
                aluno.FEITO_POR || "";

            document.getElementById("conferido2").innerText =
                aluno.CONFERIDO_POR || "";
        }

        function preencherHistorico(disciplinas) {

            const tbody = document.getElementById("tbDisciplinas");

            tbody.innerHTML = "";

            let cargaTotal = 0;

            // ORGANIZA OS MÓDULOS
            disciplinas.sort((a, b) => {

                const modA = (a.MODULO || "").trim();
                const modB = (b.MODULO || "").trim();

                return modA.localeCompare(modB, 'pt-BR', {
                    numeric: true
                });

            });

            let moduloAtual = "";

            disciplinas.forEach(item => {

                let modulo = (item.MODULO || "")
                    .replace(/\s+\d+$/, '');

                if (modulo !== moduloAtual) {

                    moduloAtual = modulo;

                    tbody.innerHTML += `
                <tr class="modulo">
                    <td colspan="4" style="
                        font-weight:bold;
                        background:#f0f0f0;
                        text-align:left;
                    ">
                        ${moduloAtual}
                    </td>
                </tr>
            `;
                }

                let ch = parseFloat(item.CH) || 0;

                cargaTotal += ch;

                tbody.innerHTML += `
            <tr>
                <td style="padding-left:20px">
                    ${item.DISCIPLINA || ""}
                </td>
                <td>${ch}</td>
                <td>${item.RESULTADO || ""}</td>
                <td>${item.SEMESTRE_ANO || ""}</td>
            </tr>
        `;
            });

            // Atualiza automaticamente a carga horária
            document.getElementById("cargaHoraria").innerText =
                cargaTotal.toLocaleString("pt-BR") + " horas";
        }
