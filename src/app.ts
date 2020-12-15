import express from 'express';

const app = express();
const port = process.env.PORT || 3210;
app.get('/', (req, res) => {
  res.send('TEST 5');
});
app.listen({ port }, () =>
  console.log(`Server running at port:${port}`)
);