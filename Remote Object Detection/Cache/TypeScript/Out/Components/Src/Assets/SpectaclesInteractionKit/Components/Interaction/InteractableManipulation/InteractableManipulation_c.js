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
// @ui {"widget":"group_start", "label":"Interactable Manipulation"}
// @input SceneObject manipulateRootSceneObject {"hint":"Root SceneObject of the set of SceneObjects to manipulate. If left blank, this script's SceneObject will be treated as the root. The root's transform will be modified by this script."}
// @input float minimumScaleFactor = 0.25 {"hint":"The smallest this object can scale down to, relative to its original scale. A value of 0.5 means it cannot scale smaller than 50% of its current size", "widget":"slider", "min":0, "max":1, "step":0.05}
// @input float maximumScaleFactor = 20 {"hint":"The largest this object can scale up to, relative to its original scale. A value of 2 means it cannot scale larger than twice its current size", "widget":"slider", "min":1, "max":20, "step":0.5}
// @input bool enableTranslation = true
// @input bool enableRotation = true
// @input bool enableScale = true
// @input bool enableStretchZ = true {"hint":"Toggles forward stretch for manipulating objects from afar."}
// @input bool showStretchZProperties {"showIf":"enableStretchZ", "showIfValue":true}
// @input float zStretchFactorMin = 1 {"hint":"Z multiplier on the near end of the stretch scale", "showIf":"showStretchZProperties", "showIfValue":true}
// @input float zStretchFactorMax = 12 {"hint":"Z multiplier on the far end of the stretch scale", "showIf":"showStretchZProperties", "showIfValue":true}
// @input bool useFilter = true {"hint":"Apply filtering to smooth manipulation"}
// @input bool showFilterProperties {"showIf":"useFilter", "showIfValue":true}
// @input float minCutoff = 2 {"showIf":"showFilterProperties", "showIfValue":true}
// @input float beta = 0.015 {"showIf":"showFilterProperties", "showIfValue":true}
// @input float dcutoff = 1 {"showIf":"showFilterProperties", "showIfValue":true}
// @input bool showTranslationProperties
// @input bool _enableXTranslation = true {"hint":"Enable translation along the world's X-axis.", "showIf":"showTranslationProperties", "showIfValue":true}
// @input bool _enableYTranslation = true {"hint":"Enable translation along the world's Y-axis.", "showIf":"showTranslationProperties", "showIfValue":true}
// @input bool _enableZTranslation = true {"hint":"Enable translation along the world's Z-axis.", "showIf":"showTranslationProperties", "showIfValue":true}
// @input bool showRotationProperties
// @input string _rotationAxis = "All" {"hint":"Enable rotation about all axes or a single world axis (x,y,z) when using to two hands.", "widget":"combobox", "values":[{"label":"All", "value":"All"}, {"label":"X", "value":"X"}, {"label":"Y", "value":"Y"}, {"label":"Z", "value":"Z"}], "showIf":"showRotationProperties", "showIfValue":true}
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
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Interaction/InteractableManipulation/InteractableManipulation");
Object.setPrototypeOf(script, Module.InteractableManipulation.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("minimumScaleFactor", []);
    checkUndefined("maximumScaleFactor", []);
    checkUndefined("enableTranslation", []);
    checkUndefined("enableRotation", []);
    checkUndefined("enableScale", []);
    checkUndefined("enableStretchZ", []);
    checkUndefined("showStretchZProperties", [["enableStretchZ",true]]);
    checkUndefined("zStretchFactorMin", [["showStretchZProperties",true]]);
    checkUndefined("zStretchFactorMax", [["showStretchZProperties",true]]);
    checkUndefined("useFilter", []);
    checkUndefined("showFilterProperties", [["useFilter",true]]);
    checkUndefined("minCutoff", [["showFilterProperties",true]]);
    checkUndefined("beta", [["showFilterProperties",true]]);
    checkUndefined("dcutoff", [["showFilterProperties",true]]);
    checkUndefined("showTranslationProperties", []);
    checkUndefined("_enableXTranslation", [["showTranslationProperties",true]]);
    checkUndefined("_enableYTranslation", [["showTranslationProperties",true]]);
    checkUndefined("_enableZTranslation", [["showTranslationProperties",true]]);
    checkUndefined("showRotationProperties", []);
    checkUndefined("_rotationAxis", [["showRotationProperties",true]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
