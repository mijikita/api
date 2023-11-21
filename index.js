import http from "node:http";
import fs from 'node:fs/promises';

http.createServer(async (req, res) => {
    // Отвечать только на GET запросы и только содержащие урл /comedians
    if (req.method === "GET" && req.url === "/comedians") {
        try {
            const data = await fs.readFile('comedians.json', 'utf-8');
            res.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
                "access-control-allow-origin": "*"
            });
            res.end(data);
        } catch (error) {
            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            res.end(`Ошибка сервера ${error}`);
        }
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
            "access-control-allow-origin": "*"
        });
        res.end("N Found");
    }
}).listen(8080);

console.log("Сервер запущен на http://localhost:8080");
