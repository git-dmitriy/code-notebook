import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import {DEMO_NOTEBOOK} from '../demo-notebook';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code';
}

function isNodeError(err: unknown): err is NodeJS.ErrnoException {
    return err instanceof Error && 'code' in err;
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();

    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {
        try {
            const result = await fs.readFile(fullPath, {encoding: 'utf-8'});
            res.send(JSON.parse(result));
        } catch (err: unknown) {
            if (isNodeError(err) && err.code === 'ENOENT') {
                await fs.writeFile(
                    fullPath,
                    JSON.stringify(DEMO_NOTEBOOK),
                    'utf-8'
                );
                res.send(DEMO_NOTEBOOK);
            } else {
                throw err;
            }
        }
    });

    router.post('/cells', async (req, res) => {
        const {cells}: { cells: Cell[] } = req.body;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({status: 'ok'});
    });

    return router;
};
