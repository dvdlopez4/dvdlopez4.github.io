const Entity = require('./Entity.js');

module.exports = class EntityManager {
    constructor() {
        this.Entities = {};
        this.EntityCounterId = 0;    
    }
    AddEntity() {
        var EntityId = this.EntityCounterId++;
        this.Entities[EntityId] = new Entity(EntityId);
        return EntityId;
    }

    RemoveEntity(EntityId) {
        if (this.Entities[EntityId] != undefined) {
            delete this.Entities[EntityId];
        }
    }

    GetEntity(EntityId) {
        if (this.Entities[EntityId] == undefined) return null;
        return this.Entities[EntityId];
    }
};
