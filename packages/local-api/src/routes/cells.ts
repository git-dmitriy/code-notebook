import express from 'express';
import {DEMO_NOTEBOOK} from '../demo-notebook';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code';
}

const isReadOnlyDemo = () => process.env.READ_ONLY_DEMO === 'true';

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
        if (isReadOnlyDemo()) {
            res.send(DEMO_NOTEBOOK);
            return;
        }

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
        if (isReadOnlyDemo()) {
            res.status(403).json({error: 'Notebook is read-only in demo mode'});
            return;
        }

        const {cells}: { cells: Cell[] } = req.body;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({status: 'ok'});
    });

    return router;
};
