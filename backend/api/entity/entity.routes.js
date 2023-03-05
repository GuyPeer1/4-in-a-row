const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getEntitys, getEntityById, addEntity, updateEntity, removeEntity } = require('./entity.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getEntitys)
router.get('/:id', getEntityById)
router.post('/', requireAuth, addEntity)
router.put('/:id', requireAuth, updateEntity)
router.delete('/:id', requireAuth, removeEntity)
router.delete('/:id', requireAuth, requireAdmin, removeEntity)


module.exports = router