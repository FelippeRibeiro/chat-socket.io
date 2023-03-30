const express = require("express");
const http = require("http");
const app = new express();
const server = http.createServer(app);
const socket = require("socket.io");
const Server = new socket.Server(server);
var cors = require("cors");
app.use(cors());

app.use(express.static("../public"));

server.listen(3000, () => {
	console.log("Rodando na portas 3000");
});

const AllClientes = [];

Server.on("connection", (socket) => {
	AllClientes.push(socket);

	socket.on("message", (arg) => {
		console.log(arg);
		AllClientes.forEach((el) => {
			if (el.id != socket.id) {
				el.emit("response", `${arg.nome} : ${arg.messsage}`);
			} else return;
		});
	});
});
