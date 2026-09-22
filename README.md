# Emissor de Histórico - Secretaria 📄🎓

## Descrição do Projeto
O **Emissor de Histórico - Secretaria** é uma aplicação web *client-side* desenvolvida para automatizar e formatar a impressão de históricos escolares dos alunos (focada no modelo do Colégio Pentágono). 

Este projeto nasceu para resolver uma incompatibilidade de formato: o sistema de gestão SEI (da Optimise) gera os relatórios de notas e dados dos alunos com as informações corretas, mas num formato visual que não atende às exigências da secretaria. Esta ferramenta atua como um formatador automático, lendo os dados brutos e encaixando-os num *layout* pronto a imprimir.

## 🔄 Fluxo de Utilização
O processo foi simplificado para não depender de automações complexas em segundo plano ou bases de dados, garantindo que a equipa da secretaria tem total controlo:
1. O utilizador exporta o relatório padrão do aluno em formato Excel (`.xlsx` ou `.xls`) diretamente do sistema SEI.
2. O utilizador abre a aplicação no navegador e faz o carregamento desse ficheiro Excel.
3. A aplicação lê os dados estruturados (separadores de Dados do Aluno e Disciplinas) e preenche automaticamente o modelo visual na página.
4. O utilizador clica em "Imprimir" para gerar o documento final formatado.

## 🛠️ Tecnologias Utilizadas
Como a aplicação processa tudo localmente no navegador do utilizador, não existe necessidade de um servidor (*backend*).
* **HTML5 & CSS3**: Estruturação e estilização do *layout* do histórico escolar (otimizado para impressão).
* **JavaScript (Vanilla)**: Lógica de negócio e manipulação do DOM.
* **[SheetJS / xlsx](https://sheetjs.com/)**: Biblioteca responsável por interpretar o ficheiro Excel importado e traduzi-lo para JSON, permitindo que o JavaScript leia os dados do SEI.

## 📋 Funcionalidades
- Leitura de ficheiros Excel diretamente no navegador (sem envio de dados sensíveis para servidores externos).
- Preenchimento dinâmico da Página 1 (Dados do aluno, curso, carga horária e grelha de disciplinas organizadas por módulos).
- Preenchimento da Página 2 (Certificado, estudos realizados e assinaturas da diretora/secretária).
- Interface limpa que desaparece no momento da impressão (`@media print`), imprimindo apenas o documento oficial.
