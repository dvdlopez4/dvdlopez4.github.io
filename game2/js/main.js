const EntityManager = require('./EntityManager.js');
const ComponentManager = require('./ComponentManager.js');

var main = function() {
    var em = new EntityManager();
    var cm = new ComponentManager();

    var id = em.AddEntity();
    cm.CreateComponent(id, "Health");
    id = em.AddEntity();
    cm.CreateComponent(id, "Health");

    console.log(cm.GetComponentList("Cheese"));
}


main();