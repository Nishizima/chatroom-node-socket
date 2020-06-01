// importar as configuracoes do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
    console.log('servidor online');
})

var io = require('socket.io').listen(server);
var listClientes = [];
app.set('io',io);
app.set('list',listClientes);

io.on('connection',function(socket){
    console.log("usuario conectou");

    socket.on('disconnect', function(){
        console.log("o usuario desconectou");
    })

    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

        socket.emit('attParticipantes', {apelido: data.apelido});

        socket.broadcast.emit('attParticipantes', {apelido: data.apelido});
    })

    socket.on('msgParaAttCliente', function(data){

        socket.emit('attParticipantes', {listClientes});

        socket.broadcast.emit('attParticipantes', {listClientes});
    })

    
});

