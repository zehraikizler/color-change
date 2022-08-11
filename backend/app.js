const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http);
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

let lastColor = '#f52905';

// connection (bağlanma) gerçekleştiği anda 

io.on('connection', (socket) => {
    console.log('bir kullanıcı bağlandı!');

    //  client tan backend e bir renk kodu iletildiğinde son renk ne ise onu iletme (alma)

    socket.emit('receive', lastColor);

    socket.on('newColor', (color) => {
        console.log(color);

        // bağlanılan tüm clientlere iletme
        lastColor= color;
        io.emit('receive', color);
    });
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı.')
    });
});

http.listen(3001, () => console.log('Server is up'));