import express from 'express';
import TriangulationBox from './components/TriangulationBox';

const port = process.env.PORT || 3000;
const app = express();

app.get('/triangulation_box', (req, res) => {
  res.json(
    new TriangulationBox(
      Number(req.query.width),
      Number(req.query.height),
      Number(req.query.dept))
  );
});

app.listen({port}, () =>
  console.log(`Server running at port:${port}`)
);