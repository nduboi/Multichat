const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { channel } = require("diagnostics_channel");
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
app.get("/build/img/Nduboi.ico", (req, res) => {
    res.sendFile(__dirname + "/build/img/Nduboi.ico"); //Menu 
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
app.get("/friend", (req, res) => {
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
    socket.on("nextquestion", (info) =>{
        var name = decodeURIComponent(escape(info.name));
        console.log(`Utilisateur : ${name} --> Question : ${info.nbrquestion}`);

        if(info.nbrquestion == 2){
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbrquestion == 3){
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbrquestion == 4){
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbrquestion == 5){
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }  
        if(info.nbrquestion == 6){
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
    })

    socket.on("test_connected", (info) =>{
        var name = decodeURIComponent(escape(info.name));
        console.log(`Utilisateur : ${name} `);
        if(info.nbr_question == 1){
            var question = "Quelle est notre niveaux d'amitié ? (1 petite connaissance - 10 amis proche)";
            var choix = `<div class=""><input type="radio" id="one_button question" name="choix" value="1"><label for="one_button">1</label><input type="radio" id="six_button question" name="choix" value="6"><label for="six_button">6</label><br><input type="radio" id="two_button question" name="choix" value="2"><label for="two_button">2</label><input type="radio" id="seven_button question" name="choix" value="7"><label for="seven_button">7</label><br><input type="radio" id="three_button question" name="choix" value="3"><label for="three_button">3</label><input type="radio" id="eight_button question" name="choix" value="8"><label for="eight_button">8</label><br><input type="radio" id="four_button question" name="choix" value="4"><label for="four_button">4</label><input type="radio" id="nine_button question" name="choix" value="9"><label for="nine_button">9</label><br><input type="radio" id="five_button question" name="choix" value="5" checked><label for="five_button">5</label><input type="radio" id="ten_button question" name="choix" value="10"><label for="ten_button">10</label><br></div><input type="text" name="name" value="${name}" hidden> <input type="text" name="nbr_question" value="${info.nbr_question}" hidden> <input type="text" name="question" value="${question}" hidden>`
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbr_question == 2){
            var question = "Si tu devrais me décrire ";
            var choix = `<div class=""><input type="radio" id="one_button question" name="choix" value="gentil"><label for="one_button">Gentil</label><input type="radio" id="six_button question" name="choix" value="chiant"><label for="six_button">Chiant</label><br><input type="radio" id="two_button question" name="choix" value="Cool"><label for="two_button">Cool</label><input type="radio" id="seven_button question" name="choix" value="attachant"><label for="seven_button">Attachant</label><br><input type="radio" id="three_button question" name="choix" value="Craquant"><label for="three_button">Cranquant</label><input type="radio" id="eight_button question" name="choix" value="Ambicieux"><label for="eight_button">Ambicieux</label><br><input type="radio" id="four_button question" name="choix" value="Intelligent"><label for="four_button">Intelligent</label><input type="radio" id="nine_button question" name="choix" value="passionnant"><label for="nine_button">Passionnant</label><br><input type="radio" id="five_button question" name="choix" value="Sexy" checked><label for="five_button">So sexy</label><input type="radio" id="ten_button question" name="choix" value="inconsient"><label for="ten_button">Inconsient</label><br></div><input type="text" name="name" value="${name}" hidden> <input type="text" name="nbr_question" value="${info.nbr_question}" hidden> <input type="text" name="question" value="${question}" hidden>`
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbr_question == 3){
            var question = "Arriverais tu as survivre avec moi sur une île déserte ?";
            var choix = `<div class=""><input type="radio" id="one_button question" name="choix" value="oui"><label for="one_button">Oui</label><input type="radio" id="six_button question" name="choix" value="Non"><label for="six_button">Non</label></div><input type="text" name="name" value="${name}" hidden> <input type="text" name="nbr_question" value="${info.nbr_question}" hidden> <input type="text" name="question" value="${question}" hidden>`
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbr_question == 4){
            var question = "Quelle est notre niveaux d'amitié ? (1 petite connaissance - 10 amis proche)";
            var choix = `<div class=""><input type="radio" id="one_button question" name="choix" value="1"><label for="one_button">1</label><input type="radio" id="six_button question" name="choix" value="6"><label for="six_button">6</label><br><input type="radio" id="two_button question" name="choix" value="2"><label for="two_button">2</label><input type="radio" id="seven_button question" name="choix" value="7"><label for="seven_button">7</label><br><input type="radio" id="three_button question" name="choix" value="3"><label for="three_button">3</label><input type="radio" id="eight_button question" name="choix" value="8"><label for="eight_button">8</label><br><input type="radio" id="four_button question" name="choix" value="4"><label for="four_button">4</label><input type="radio" id="nine_button question" name="choix" value="9"><label for="nine_button">9</label><br><input type="radio" id="five_button question" name="choix" value="5" checked><label for="five_button">5</label><input type="radio" id="ten_button question" name="choix" value="10"><label for="ten_button">10</label><br></div><input type="text" name="name" value="${name}" hidden> <input type="text" name="nbr_question" value="${info.nbr_question}" hidden> <input type="text" name="question" value="${question}" hidden>`
            socket.emit('question : ' + name, {message : question, choice : choix} )
        }
        if(info.nbr_question == 5){
            var question = "Quelle est notre niveaux d'amitié ? (1 petite connaissance - 10 amis proche)";
            var choix = `<div class=""><input type="radio" id="one_button question" name="choix" value="1"><label for="one_button">1</label><input type="radio" id="six_button question" name="choix" value="6"><label for="six_button">6</label><br><input type="radio" id="two_button question" name="choix" value="2"><label for="two_button">2</label><input type="radio" id="seven_button question" name="choix" value="7"><label for="seven_button">7</label><br><input type="radio" id="three_button question" name="choix" value="3"><label for="three_button">3</label><input type="radio" id="eight_button question" name="choix" value="8"><label for="eight_button">8</label><br><input type="radio" id="four_button question" name="choix" value="4"><label for="four_button">4</label><input type="radio" id="nine_button question" name="choix" value="9"><label for="nine_button">9</label><br><input type="radio" id="five_button question" name="choix" value="5" checked><label for="five_button">5</label><input type="radio" id="ten_button question" name="choix" value="10"><label for="ten_button">10</label><br></div><input type="text" name="name" value="${name}" hidden> <input type="text" name="nbr_question" value="${info.nbr_question}" hidden> <input type="text" name="question" value="${question}" hidden>`
            socket.emit('question : ' + name, {message : question, choice : choix} )
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
    // socket.on("encodeelement", (info) =>{
    //     console.log(`Element : ${info.encode}`)
    //     element_decode = decodeURIComponent(escape(info.encode))
    //     console.log(`Element decode : ${element_decode}`)
    //     io.emit(`element : decode`, {decode : element_decode})
    // })
})
var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Serveur OK");
})

