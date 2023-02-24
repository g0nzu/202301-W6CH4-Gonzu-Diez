import http from 'http';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();

const createServer = (port: string | number) => {
  const server = http.createServer((req, resp) => {
    switch (req.method) {
      case 'GET': {
        const { pathname } = url.parse(req.url || '', true);
        if (pathname === '/calculator') {
          const { a, b } = req.query;
          if (!a || isNaN(Number(a)) || !b || isNaN(Number(b))) {
            resp.writeHead(400, { 'Content-Type': 'text/plain' });
            resp.end('Error: Debe proporcionar dos números válidos');
            return;
          }
          const numA = parseFloat(a);
          const numB = parseFloat(b);
          const suma = numA + numB;
          const resta = numA - numB;
          const multiplicacion = numA * numB;
          const division = numA / numB;
          resp.writeHead(200, { 'Content-Type': 'text/plain' });
          resp.end(`
            Resultados:
            ${numA} + ${numB} = ${suma}
            ${numA} - ${numB} = ${resta}
            ${numA} * ${numB} = ${multiplicacion}
            ${numA} / ${numB} = ${division}
          `);
        } else {
          resp.writeHead(404, { 'Content-Type': 'text/plain' });
          resp.end('Error 404: Not Found');
        }
        break;
      }
      case 'POST':
        resp.writeHead(200, { 'Content-Type': 'text/plain' });
        resp.end(`Aún no tenemos ${req.method}`);
        break;
      case 'PATCH':
        resp.writeHead(200, { 'Content-Type': 'text/plain' });
        resp.end(`Aún no tenemos ${req.method}`);
        break;
      case 'DELETE':
        resp.writeHead(200, { 'Content-Type': 'text/plain' });
        resp.end(`Aún no tenemos ${req.method}`);
        break;
      default:
        resp.writeHead(400, { 'Content-Type': 'text/plain' });
        resp.end('Error 400: Bad Request');
        break;
    }
  });

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });

  return server;
};

export default createServer;
