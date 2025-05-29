const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

const mongoose = require('mongoose');//calling mongodb module
mongoose.connect("mongodb+srv://ychelapaka:4sFEYlfl5yldOR5Q@todoapp.lta3iea.mongodb.net/todo")
  .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDb connection error", err));
//todo--database name
//schema--structure,new keyword--it allocate a specific space in a memory
const trySchema = new mongoose.Schema({ name: String });//create a schema
const Item = mongoose.model("Task", trySchema);//create collection name for db
//inserting data
const todo = new Item({ name: "YagNItha" });
// todo.save();
app.get("/", (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });
        }).catch(err => {
            console.error(err);
            res.status(500).send("Something went wrong")
        })
})

app.post("/", function (req, res) {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
})

app.post("/delete", async (req, res) => {//form action delete,so we create delete methos
    const checked = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(checked);
        console.log("deleted item with id:", checked);
        res.redirect("/");
    } catch (err) {
        console.error("error deleting item", err);
        res.status(500).send("error deleting item");
    }
});

app.listen(port, () => {
    console.log("Server started on port http://localhost:3000");
});

