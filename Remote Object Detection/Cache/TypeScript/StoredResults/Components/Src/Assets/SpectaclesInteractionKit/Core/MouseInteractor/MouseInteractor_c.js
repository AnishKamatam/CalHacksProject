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
// @ui {"widget":"group_start", "label":"Interactor"}
// @input bool _drawDebug
// @ui {"widget":"group_start", "label":"Spherecast Configuration"}
// @input bool sphereCastEnabled
// @input number[] spherecastRadii = "{0.5, 2.0, 4.0}" {"showIf":"sphereCastEnabled", "showIfValue":true}
// @input number[] spherecastDistanceThresholds = "{0, 12, 30}" {"showIf":"sphereCastEnabled", "showIfValue":true}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Targeting Configuration"}
// @input float _maxRaycastDistance = 500
// @input float indirectTargetingVolumeMultiplier = 1
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Indirect Drag Provider"}
// @input float indirectDragThreshold = 3
// @ui {"widget":"group_end"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"MouseInteractor"}
// @input float mouseTargetingMode = 2 {"hint":"Sets the return value of MouseInteractor.activeTargetingMode for cases where non-indirect targeting needs to be tested specifically. Useful whenever your code has checks for interactor.activeTargetingMode === TargetingMode.X.", "widget":"combobox", "values":[{"label":"Direct", "value":1}, {"label":"Indirect", "value":2}, {"label":"All", "value":3}, {"label":"Poke", "value":4}]}
// @ui {"widget":"group_end"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Core/MouseInteractor/MouseInteractor");
Object.setPrototypeOf(script, Module.MouseInteractor.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("_drawDebug", []);
    checkUndefined("sphereCastEnabled", []);
    checkUndefined("spherecastRadii", [["sphereCastEnabled",true]]);
    checkUndefined("spherecastDistanceThresholds", [["sphereCastEnabled",true]]);
    checkUndefined("_maxRaycastDistance", []);
    checkUndefined("indirectTargetingVolumeMultiplier", []);
    checkUndefined("indirectDragThreshold", []);
    checkUndefined("mouseTargetingMode", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
