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
// @input bool _debugDrawEnabled
// @input bool enableHorizontalScroll
// @input bool enableVerticalScroll = true
// @input bool _enableScrollInertia = true
// @input bool enableScrollLimit = true
// @input float _scrollLimit = 0.3 {"widget":"slider", "min":0, "max":1, "step":0.01}
// @input vec2 scrollAreaBounds = "{1, 1}"
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/UI/ScrollView/ScrollView");
Object.setPrototypeOf(script, Module.ScrollView.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_debugDrawEnabled", []);
    checkUndefined("enableHorizontalScroll", []);
    checkUndefined("enableVerticalScroll", []);
    checkUndefined("_enableScrollInertia", []);
    checkUndefined("enableScrollLimit", []);
    checkUndefined("_scrollLimit", []);
    checkUndefined("scrollAreaBounds", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
