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
// @input Asset.Material lineMaterial
// @input vec3 _beginColor = "{1, 1, 0}" {"widget":"color"}
// @input vec3 _endColor = "{1, 1, 0}" {"widget":"color"}
// @input float lineWidth = 0.5
// @input float lineLength = 160
// @input float lineStyle = 2 {"widget":"combobox", "values":[{"label":"Full", "value":0}, {"label":"Split", "value":1}, {"label":"FadedEnd", "value":2}]}
// @input bool shouldStick = true
// @input Component.ScriptComponent _interactor
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Interaction/InteractorLineVisual/InteractorLineVisual");
Object.setPrototypeOf(script, Module.InteractorLineVisual.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("lineMaterial", []);
    checkUndefined("_beginColor", []);
    checkUndefined("_endColor", []);
    checkUndefined("lineWidth", []);
    checkUndefined("lineLength", []);
    checkUndefined("lineStyle", []);
    checkUndefined("shouldStick", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
