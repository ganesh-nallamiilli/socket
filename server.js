const net = require('net');
const Main = require('iso_8583');

const HOST = '127.0.0.1';
const PORT = 3000;
const data_1 = [{id:1, name:"Aathavan"}, {id:2, name:"Ganesh"}]

const server = net.createServer((socket) => {
    console.log('Client is connected');

    socket.on('data', (data) => {
        console.log(`Received from the client is : ${data}`);
        
        const staticMeta = 'ISO70100000';
        const json = new Main().setMetadata(staticMeta).getIsoJSON(data,{})
        console.log(json)
        socket.write("Received buffer")
        });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});