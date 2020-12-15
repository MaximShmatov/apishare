import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('TEST 3');
});
app.listen({ port }, () =>
  console.log(`Server running at port:${port}`)
);