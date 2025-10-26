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
// @input Asset.Material toggledOffMaterial
// @input Asset.Material toggledOffSelectMaterial
// @input Asset.Material toggledOnMaterial
// @input Asset.Material toggledOnSelectMaterial
// @input Asset.Material disabledMaterial
// @input Component.RenderMeshVisual[] meshVisuals = {}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Helpers/ToggleFeedback");
Object.setPrototypeOf(script, Module.ToggleFeedback.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("toggledOffMaterial", []);
    checkUndefined("toggledOffSelectMaterial", []);
    checkUndefined("toggledOnMaterial", []);
    checkUndefined("toggledOnSelectMaterial", []);
    checkUndefined("disabledMaterial", []);
    checkUndefined("meshVisuals", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
