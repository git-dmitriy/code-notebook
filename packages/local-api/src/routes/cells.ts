import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    // make sure the cell storage file exist
    // if it does not exist, add in a default list of cells
    // read the file
    // parse list of cells back to browser
    // sent list of cells back to browser
  });
  router.post('/cells', async (req, res) => {
    // take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // write the cell into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'ok' });
  });

  return router;
};
