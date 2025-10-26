if (script.onAwake) {
    script.onAwake();
    return;
}
function checkUndefined(property, showIfData) {
    for (var i = 0; i < showIfData.length; i++) {
        if (showIfData[i][0] && script[showIfData[i][0]] != showIfData[i][1]) {
            return;
        }
    }
    if (script[property] == undefined) {
        throw new Error("Input " + property + " was not provided for the object " + script.getSceneObject().name);
    }
}
// @input vec2 _planeSize = {10,10}
// @input float _proximityDistance
// @input bool _drawDebug
// @input float _behindDistance
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Interaction/InteractionPlane/InteractionPlane");
Object.setPrototypeOf(script, Module.InteractionPlane.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_planeSize", []);
    checkUndefined("_proximityDistance", []);
    checkUndefined("_drawDebug", []);
    checkUndefined("_behindDistance", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
