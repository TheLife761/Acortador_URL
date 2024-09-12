var express = require('express');
var urlsRouter = require('./routes.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', urlsRouter);

// Server Setup
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});