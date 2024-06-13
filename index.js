const express = require("express");
const { engine } = require("express-handlebars");
const http = require("http");
const socketIo = require("socket.io");
const dbConnection = require("./dbConnection"); // Ensure this line is importing the dbConnection

const app = express();
let router = require("./route/route");

const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use('/uploads', express.static(__dirname + '/uploads'));

// Add handlebars engine to dynamically inject clothes
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  setTimeout(() => {
    socket.emit("showBanner", true);
  }, 10000);
});

app.use("/", router);

server.listen(port, () => {
  console.log("App listening to: " + port);
});
