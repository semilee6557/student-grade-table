const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/studentGradeTable'
});

const express = require('express');
const app = express();
const jsonMiddleware = express.json();

app.use(jsonMiddleware);

const path = require('path')
const htmlPath = path.join(__dirname)
const staticMiddleware = express.static(htmlPath)

app.use(staticMiddleware)

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select *
      from "grades"
  `;
  db.query(sql)
    .then(result =>
      res.status(200).json(result.rows)
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/grades', (req, res) => {
  const grade = req.body;
  if (grade.score < 1 || grade.score > 100 || !grade.score || !grade.name || !grade.course) {
    res.status(400).json({
      error: 'Missing or invalid data input.'
    });
    return;
  }
  const sqlText = `
  insert into "grades"("name", "course", "score")
  values ($1, $2, $3)
  returning *
  `;
  const sqlValues = [grade.name, grade.course, grade.score];

  db.query(sqlText, sqlValues)
    .then(result =>
      res.status(200).json(result.rows[0])
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.patch('/api/grades/:gradeId', (req, res) => {

  const gradeId = parseInt(req.params.gradeId, 10);
  const newGrade = req.body;

  if (gradeId < 0 || !Number.isInteger(gradeId) || newGrade.score < 1 || newGrade.score > 100 || !newGrade.score || !newGrade.name || !newGrade.course) {
    res.status(400).json({
      error: 'Missing or invalid data input.'
    });
    return;
  }

  const sqlText = `
update "grades"
   set "name" = $1,
       "course" = $2,
       "score" = $3
 where "gradeId" = $4
 returning *
  `;
  const sqlValues = [newGrade.name, newGrade.course, newGrade.score, gradeId];

  db.query(sqlText, sqlValues)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with 'gradeId' ${gradeId}`
        });
      } else {
        res.status(200).json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });

});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = parseInt(req.params.gradeId, 10);

  if (gradeId < 0 || !Number.isInteger(gradeId)) {
    res.status(400).json({
      error: 'invalid gradeId'
    });
    return;
  }

  const sqlText = `
  delete from "grades"
  where "gradeId" = $1
  returning *;
  `;

  const sqlValue = [gradeId];

  db.query(sqlText, sqlValue)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `gradeId ${gradeId} is not exist`
        });
      } else {
        res.sendStatus(204);
      }
    }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
