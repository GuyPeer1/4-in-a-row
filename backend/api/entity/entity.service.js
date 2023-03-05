const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

async function query() {
    try {
        const collection = await dbService.getCollection('entity')
        let entitys = await collection.find().toArray()
        return entitys
    } catch (err) {
        logger.error('cannot find entitys', err)
        throw err
    }
}

async function getById(entityId) {
    try {
        const collection = await dbService.getCollection('entity')
        const entity = collection.findOne({ _id: ObjectId(entityId) })
        return entity
    } catch (err) {
        logger.error(`while finding entity ${entityId}`, err)
        throw err
    }
}

async function remove(entityId) {
    try {
        const collection = await dbService.getCollection('entity')
        await collection.deleteOne({ _id: ObjectId(entityId) })
        return entityId
    } catch (err) {
        logger.error(`cannot remove entity ${entityId}`, err)
        throw err
    }
}

async function add(entity) {
    try {
        const collection = await dbService.getCollection('entity')
        await collection.insertOne(entity)
        return entity
    } catch (err) {
        logger.error('cannot insert entity', err)
        throw err
    }
}

async function update(entity) {
    try {
        const entityToSave = {
            /// what you want to update
        }
        const collection = await dbService.getCollection('entity')
        await collection.updateOne({ _id: ObjectId(entity._id) }, { $set: entityToSave })
        return car
    } catch (err) {
        logger.error(`cannot update entity ${entity._id}`, err)
        throw err
    }
}

