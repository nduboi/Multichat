const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { channel } = require("diagnostics_channel");
const NodeMediaServer = require('node-media-server');

const config = {
    logType: 3,

    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8080,
        allow_origin: '*'
    }
};

var nms = new NodeMediaServer(config)
nms.run();



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); //Menu 
})
app.get("build/img/Nduboi.ico", (req, res) => {
    res.sendFile(__dirname + "build/img/Nduboi.ico"); //Menu 
})
app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/chat.html"); //Chat
})
app.get("/namechat", (req, res) => {
    res.sendFile(__dirname + "/name.html"); //Nom Pour Chat
})
app.get("/namechannel", (req, res) => {
    res.sendFile(__dirname + "/nameinfo.html"); //Nom Pour Chat
})
app.get("/namevideo", (req, res) => {
    res.sendFile(__dirname + "/namevideo.html"); //Nom Pour Vidéo
})
app.get("/rtmp", (req, res) => {
    res.sendFile(__dirname + "/rtmp.html"); //Jeu
})
app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/test.html"); //test
})

io.on("connection", (socket) => {
    socket.on(`Joueur conecter`, (info) => {
        var name = decodeURIComponent(escape(info.name_encode))

        if(info.channel == "Admin"){
            if(info.psw == "662768"){
                //Envoie sur le channel Admin
                io.emit(`chat_name : ${name}`, {name : name, channel : info.channel});
                console.log(`Users : ${name} --> Channel : ${info.channel}`);
                const join = "a rejoint le chat sur le chanel"; 
                io.emit(`rejoint : ${info.channel}`, {name : name, channel : info.channel, message : join } );
            }else{
                //Redirection vers le chat global
                console.log(`Users : ${name} --> Channel : Admin -> Global`);
                const join = "a rejoint le chat sur le chanel"; 
                // io.emit(`rejoint : ${info.channel}`, {name : info.name, channel : "Unori", message : join } );
                io.emit(`globalvs : ${name}`, {name : name, channel : "Global" } );
            }
        }else{
            io.emit(`chat_name : ${name}`, {name : name, channel : info.channel});
            console.log(`Users : ${name} --> Channel : ${info.channel}`);
            const join = "a rejoint le chat sur le chanel"; 
            io.emit(`rejoint : ${info.channel}`, {name : name, channel : info.channel, message : join } );
        }        
    })
    socket.on("Changementdesite", pseudo => {
        var pseudo = decodeURIComponent(escape(pseudo))
        console.log("Utilisateur : " + pseudo + " a changer de page");
        io.emit("Changementdesiteconfirmation", pseudo);
    })
    // socket.on("disconnect", () => {
    //     console.log("déconnecté");
    // })
    socket.on("deconexion", (info) => {
        var name = decodeURIComponent(escape(info.pseudo))
        console.log(`Utilisateur :  ${name}   déconnecter`); 
        const deconexion = ` a quitter le chat`
        io.emit(`leave : ${info.channel}`, {name : name, channel : info.channel, message : deconexion });
    })
    socket.on("chat message", (msg) =>{
        var name = decodeURIComponent(escape(msg.name))
        console.log(`Users : ${name} --> Channel : ${msg.channel} --> Message : ${msg.message}`);
        io.emit(`chat message : ${msg.channel}` , {message : msg.message, name : name, channel : msg.channel});
    })
    socket.on("changementnom", name => {
        var name = decodeURIComponent(escape(name))
        console.log("Utilisateur : " + name + ", connecter Nom Chat");
    })
    socket.on("changementnomvideo", name => {
        var name = decodeURIComponent(escape(name))
        console.log("Utilisateur : " + name + ", connecter Nom Vidéo");
    })
    socket.on("message stream", info => {
        var name = info.name
        var viewers = info.viewers
        var message = info.message
        var stream = info.stream
        console.log(`Users : ${viewers} --> Channel : ${name} --> Message : ${message}`);
        io.emit(`newmessage stream : ${name}` , {message : message, viewers : viewers, name : name});
    })
    // socket.on("encodeelement", (info) =>{
    //     console.log(`Element : ${info.encode}`)
    //     element_decode = decodeURIComponent(escape(info.encode))
    //     console.log(`Element decode : ${element_decode}`)
    //     io.emit(`element : decode`, {decode : element_decode})
    // })
})
var port = 80;
http.listen(port, () => {
    console.log("Serveur OK");
})

