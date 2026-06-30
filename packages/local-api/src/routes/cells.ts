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

function isCellArray(data: unknown): data is Cell[] {
    return (
        Array.isArray(data) &&
        data.every(
            (item) =>
                item !== null &&
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                typeof item.content === 'string' &&
                (item.type === 'text' || item.type === 'code')
        )
    );
}

async function seedDemoNotebook(fullPath: string): Promise<Cell[]> {
    await fs.writeFile(fullPath, JSON.stringify(DEMO_NOTEBOOK), 'utf-8');
    return DEMO_NOTEBOOK;
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();

    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {
        try {
            const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

            try {
                const parsed: unknown = JSON.parse(result);
                if (isCellArray(parsed)) {
                    res.send(parsed);
                    return;
                }
            } catch {
                // Invalid JSON — fall through to reseed below.
            }

            res.send(await seedDemoNotebook(fullPath));
        } catch (err: unknown) {
            if (isNodeError(err) && err.code === 'ENOENT') {
                res.send(await seedDemoNotebook(fullPath));
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
