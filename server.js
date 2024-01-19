const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const { connectToDb, getDb } = require("./db");

express.static('/static')


app.use(bodyparser.json());


let db
connectToDb((err) => {
  if (!err) {
    db = getDb();
    console.log("connected to database");
    app.listen(3000);
  } else {
    console.log(err);
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/static/index.html')
})

app.get('/allprojects', (req, res)=>{
  let allProjects = []
  let allBin = []
  db.collection('projects').find().forEach(project => {
    allProjects.push(project)
  }).then(()=>{
    console.log(allProjects)
    db.collection('bin').find().forEach(project => {
      allBin.push(project)
    }).then(()=>{
      const allData = {
        projects: allProjects,
        bin: allBin
      }
      res.json(allData)
    })
  })
})

app.post('/addProject', (req, res)=>{
    db.collection('projects').insertOne(req.body).then(()=>{
      console.log('added')
      res.send('added to db')
    })
})

app.post('/toBin', (req, res)=>{
  db.collection('bin').insertOne(req.body).then(()=>{
     console.log("deleted");
     db.collection('projects').deleteOne({id: req.body.id}).then(()=>{
       res.send("added to bin");
     })
  })
})

