const net = require('net');
const Main = require('iso_8583');

const HOST = '127.0.0.1';
const PORT = 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Connected to server');

    // client.write('Hello, server!');
    let data = { 
        0: '0200',
        2: '4761739001010119',
        3: '000000',
        4: '000000005000',
        7: '0911131411',
        12: '131411',
        13: '0911',
        14: '2212',
        18: '4111',
        22: '051',
        23: '001',
        25: '00',
        26: '12',
        32: '423935',
        33: '111111111',
        35: '4761739001010119D22122011758928889',
        41: '12345678',
        42: 'MOTITILL_000001',
        43: 'My Termianl Business                    ',
        49: '404',
        52: '7434F67813BAE545',
        56: '1510',
        123: '91010151134C101',
        127: '000000800000000001927E1E5F7C0000000000000000500000000000000014A00000000310105C000128FF0061F379D43D5AEEBC8002800000000000000001E0302031F000203001406010A03A09000008CE0D0C840421028004880040417091180000014760BAC24959',
      };
    
     const staticMeta = 'ISO70100000';
     const isopack = new Main(data);
     isopack.setMetadata(staticMeta);
    const buffer = isopack.getBufferMessage();

    console.log(buffer)
    console.log(buffer.byteLength)
    console.log(buffer.toString())
    console.log("------------")
    
    client.write(buffer)
    // client.write('Hello from client2 - XYZ');
});

client.on('data', (data) => {

    console.log(`Received from server: ${data}`);
    client.destroy();
});



client.on('error', (err) => {
    console.error('Error=========:', err);
});

client.on('close', () => {
    console.log('Connection closed');
});