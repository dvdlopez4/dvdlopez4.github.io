const Component = require('./Component.js');

module.exports = class ComponentManager {
    constructor() {
        this.EntityLookUp = {};
    }
    CreateComponent(EntityId, type) {
        var component = new Component(EntityId);
        component.Name = type;
        this.EntityLookUp[EntityId] = {};
        this.EntityLookUp[EntityId][type] = component;
    }

    RemoveComponent(EntityId, type) {
        if (this.EntityLookUp[EntityId] != undefined && this.EntityLookUp[EntityId][type] != undefined) {
            delete this.EntityLookUp[EntityId][type];
        }
    }

    GetComponent(EntityId, type) {
        if (this.EntityLookUp[EntityId] != undefined && this.EntityLookUp[EntityId][type] != undefined) {
            return this.EntityLookUp[EntityId][type];
        }
        return null;
    }

    GetComponentList(type) {
        var componentList = [];
        for (var key in this.EntityLookUp) {
            if (this.EntityLookUp[key][type] != undefined) {
                componentList.push(this.EntityLookUp[key][type]);
            }
        }
        return componentList;
    }
};
