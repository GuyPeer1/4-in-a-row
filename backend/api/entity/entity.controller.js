const entityService = require('./entity.service.js')
const logger = require('../../services/logger.service')

module.exports = {
  getEntitys,
  getEntityById,
  addEntity,
  updateEntity,
  removeEntity,
}

async function getEntitys(req, res) {
  try {
    logger.debug('Getting Cars')
    const entitys = await entityService.query()
    res.json(entitys)
  } catch (err) {
    logger.error('Failed to get entitys', err)
    res.status(500).send({ err: 'Failed to get entitys' })
  }
}

async function getEntityById(req, res) {
  try {
    const entityId = req.params.id
    const entity = await entityService.getById(entityId)
    res.json(entity)
  } catch (err) {
    logger.error('Failed to get entity', err)
    res.status(500).send({ err: 'Failed to get entity' })
  }
}

async function addEntity(req, res) {
  try {
    const entity = req.body
    const addedEntity = await entityService.add(entity)
    res.json(addedEntity)
  } catch (err) {
    logger.error('Failed to add entity', err)
    res.status(500).send({ err: 'Failed to add entity' })
  }
}

async function updateEntity(req, res) {
  try {
    const entity = req.body
    const updatedEntity = await entityService.update(entity)
    res.json(updatedEntity)
  } catch (err) {
    logger.error('Failed to update entity', err)
    res.status(500).send({ err: 'Failed to update entity' })
  }
}

async function removeEntity(req, res) {
  try {
    const entityId = req.params.id
    const removedId = await entityService.remove(entityId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove entity', err)
    res.status(500).send({ err: 'Failed to remove entity' })
  }
}
