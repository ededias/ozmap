import { Router } from 'express';
import * as region from '../controllers/regionController';

const router = Router();

router.post('/', region.createRegion);
router.get('/', region.listRegions);
router.get('/:', region.listRegions);
router.put('/:id', region.updateRegion);
router.delete('/:id', region.deleteRegion);



export default router;
