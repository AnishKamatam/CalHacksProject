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
// @ui {"widget":"group_start", "label":"Hand Interactor"}
// @input string handType = "right" {"widget":"combobox", "values":[{"label":"Left", "value":"left"}, {"label":"Right", "value":"right"}]}
// @input string raycastAlgorithm = "Proxy" {"hint":"Forwards the TargetingData received from LensCore's Gesture Module", "widget":"combobox", "values":[{"label":"AnchorVariableShoulder", "value":"AnchorVariableShoulder"}, {"label":"LegacySingleCamera", "value":"LegacySingleCamera"}, {"label":"AnchorHead", "value":"AnchorHead"}, {"label":"Proxy", "value":"Proxy"}]}
// @input bool forcePokeOnNonDominantPalmProximity {"hint":"Forces the usage of Poke targeting when interacting near the nondominant hand's palm."}
// @input float directColliderEnterRadius = 1 {"hint":"The radius around the midpoint of the index/thumb to target Interactables."}
// @input float directColliderExitRadius = 1.5 {"hint":"The radius around the midpoint of the index/thumb to de-target Interactables (for bistable thresholding)."}
// @input float directDragThreshold = 3
// @input bool filterBasedOnIntent {"hint":"If true far field interactions will be disable when your hand is not in an interacting pose."}
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
var Module = require("../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Core/HandInteractor/HandInteractor");
Object.setPrototypeOf(script, Module.HandInteractor.prototype);
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
    checkUndefined("handType", []);
    checkUndefined("raycastAlgorithm", []);
    checkUndefined("forcePokeOnNonDominantPalmProximity", []);
    checkUndefined("directColliderEnterRadius", []);
    checkUndefined("directColliderExitRadius", []);
    checkUndefined("directDragThreshold", []);
    checkUndefined("filterBasedOnIntent", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
