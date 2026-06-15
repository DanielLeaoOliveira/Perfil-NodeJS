const http = require('http');
const fs = require('fs');

function lerArquivo(response, arquivo, contentType) {
    fs.readFile(arquivo, (erro, dados) => {
        if (erro) {
            response.writeHead(500, { 'Content-Type': "text/plain; charset=utf-8" })
            response.end("Erro ao abrir o arquivo" + arquivo);
            return;
        }
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(dados)
    })
}

const servidor = http.createServer((request, response) => {
    const rota = new URL(request.url, "http://localhost:3000").pathname;

    switch (rota) {
        case "/":
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <title> Bem-Vindo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Quicksand:wght@300..700&display=swap"
                rel="stylesheet">
                <style>
                    body{
                        background-color: #0c0c0c;
                        color: #e4e4e4;
                        font-family: 'Quicksand';
                    }
                    .titulo{
                        font-family: 'Bungee';
                    }
                    
                </style>
            </head>
            <body>
            <div class="container">
                <h1 class="titulo mt-5"> Seja Bem-Vindo(a) </h1>
                <p> Rotas disponiveis: </p>
                <div class="vstack gap-1">
                    <div class="group"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg><a href="/dados.json">Aba de produtos</a></div>
                    <div class="group"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg><a href="/atv.html">Quem somos</a></div>
                </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
                crossorigin="anonymous"></script>
            </body>
            </html>
        `)
            break;
        case "/atv.html":
            lerArquivo(response, "atv.html", "text/html; charset=utf-8")
            break;

        case "/dados.json":
            lerArquivo(response, "dados.json", "application/json; charset=utf-8")
            break;

        case "/foto.png":
            lerArquivo(response, "foto.png", "image/png; charset=utf-8")
            break;

        default:
            response.writeHead(404, { "Content-Type": "text-plain; charset=utf-8" })
            response.end("Rota não encontrada" + rota)
            break;
    }
})

servidor.listen(3000);
console.log("Servidor iniciado em http://localhost:3000")


