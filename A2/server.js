/********************************************************************************* WEB322 – Assignment 02** I declare that this assignment is my own work in accordance with Seneca's* Academic Integrity Policy:** https://www.senecacollege.ca/about/policies/academic-integrity-policy.html** Name: __Hla Myint Myat________ Student ID: ___185923216___ Date: ____1.2.24____*********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = 3000;

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Assignment 2: Hla Myint Myat - 185923216');
    });

    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(sets => {
          res.json(sets);
        })
        .catch(error => {
          res.status(404).send('Error: Failed to get all sets.');
        });
    });

    app.get('/lego/sets/num-demo', (req, res) => {
        const setNum = '05-1'; 
        legoData.getSetByNum(setNum)
          .then(set => {
            if (set) {
              res.json(set);
            } else {
              res.status(404).send('Error: Set not found.');
            }
          })
          .catch(error => {
            res.status(404).send('Error: Failed to get set by number.');
          });
    });
    
    app.get('/lego/sets/theme-demo', (req, res) => {
        const theme = 'Service Packs'; 
        legoData.getSetsByTheme(theme)
          .then(sets => {
            if (sets.length > 0) {
              res.json(sets);
            } else {
              res.status(404).send('Error: No sets found for the theme.');
            }
          })
          .catch(error => {
            res.status(404).send('Error: Failed to get sets by theme.');
          });
    });
    

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error initializing Lego data:', error);
  });
