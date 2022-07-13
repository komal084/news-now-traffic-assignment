const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/status', (req, res) => {
  if (req.query.code && req.query.code == 200) {
    res.sendStatus(200);
  } else if (req.query.code && req.query.code == 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () =>
  console.log(`API server listening on port: ${port}`)
);
