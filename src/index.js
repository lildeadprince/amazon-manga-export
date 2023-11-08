import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
app.get('/', (req, res) => {
  res.send('Hi!');
})

app.listen(8000);
