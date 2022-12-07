const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const NodeMediaServer = require('node-media-server');

const config = {
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
app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/chat.html"); //Chat
})
app.get("/namechat", (req, res) => {
    res.sendFile(__dirname + "/name.html"); //Nom Pour Chat
})
app.get("/namevideo", (req, res) => {
    res.sendFile(__dirname + "/namevideo.html"); //Nom Pour Vidéo
})
app.get("/rtmp", (req, res) => {
    res.sendFile(__dirname + "/rtmp.html"); //Jeu
})

io.on("connection", (socket) => {
    socket.on("Joueur conecter", pseudo => {
        console.log("Utilisateur : " + pseudo + " connecter Chat"); 
        var join = pseudo +" a rejoint le chat"
        io.emit("rejoint", join);
    })
    socket.on("Changementdesite", pseudo => {
        console.log("Utilisateur : " + pseudo + " a changer de page");
        io.emit("Changementdesiteconfirmation", pseudo);
    })
    socket.on("disconnect", () => {
        console.log("déconnecté");
    })
    socket.on("deconexion", pseudo => {
        console.log("Utilisateur : " + pseudo + " déconnecter"); 
        var deconexion = pseudo + " a quitter le chat"
        io.emit("leave", deconexion);
    })
    socket.on("chat message", (msg) =>{
        io.emit("chat message", msg);
    })
    socket.on("changementnom", name => {
        console.log("Utilisateur : " + name + ", connecter Nom Chat");
    })
    socket.on("changementnomvideo", name => {
        console.log("Utilisateur : " + name + ", connecter Nom Vidéo");
    })
})
var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Serveur OK");
})

