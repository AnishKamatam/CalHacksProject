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
// @ui {"widget":"group_start", "label":"Frame Settings"}
// @input bool autoShowHide = true
// @input vec2 innerSize = "{32,32}"
// @input float border = 7
// @input vec2 constantPadding = "{0,0}" {"hint":"In world units (cm), stays constant through scaling"}
// @input bool allowScaling = true
// @input bool autoScaleContent = true
// @input bool isContentInteractable
// @input bool allowTranslation = true
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"widget":"group_start", "label":"Min/Max Size"}
// @input vec2 minimumSize = "{10,10}" {"hint":"In world units (cm)"}
// @input vec2 maximumSize = "{150,150}" {"hint":"In world units (cm)"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"widget":"group_start", "label":"Billboarding"}
// @input bool useBillboarding
// @input bool xOnTranslate {"showIf":"useBillboarding"}
// @input bool xAlways {"showIf":"xOnTranslate"}
// @input bool yOnTranslate {"showIf":"useBillboarding"}
// @input bool yAlways {"showIf":"yOnTranslate"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"widget":"group_start", "label":"Snapping"}
// @input bool useSnapping {"hint":"Use Snapping Behaviors"}
// @input bool itemSnapping {"hint":"Container to Container Snapping", "showIf":"useSnapping"}
// @input bool worldSnapping {"hint":"Container to World Snapping", "showIf":"useSnapping"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"widget":"group_start", "label":"Follow Behavior"}
// @input bool showFollowButton
// @input bool useFOVFollow {"label":"Front Follow Behavior", "showIf":"showFollowButton"}
// @input bool isFollowing {"showIf":"useFOVFollow"}
// @ui {"widget":"group_end"}
// @ui {"widget":"label", "label":""}
// @ui {"widget":"group_start", "label":"Close Button"}
// @input bool showCloseButton = true
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Interaction Plane"}
// @input bool _enableInteractionPlane
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/UI/ContainerFrame/ContainerFrame");
Object.setPrototypeOf(script, Module.ContainerFrame.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("autoShowHide", []);
    checkUndefined("innerSize", []);
    checkUndefined("border", []);
    checkUndefined("constantPadding", []);
    checkUndefined("allowScaling", []);
    checkUndefined("autoScaleContent", []);
    checkUndefined("isContentInteractable", []);
    checkUndefined("allowTranslation", []);
    checkUndefined("minimumSize", []);
    checkUndefined("maximumSize", []);
    checkUndefined("useBillboarding", []);
    checkUndefined("xOnTranslate", [["useBillboarding",true]]);
    checkUndefined("xAlways", [["xOnTranslate",true]]);
    checkUndefined("yOnTranslate", [["useBillboarding",true]]);
    checkUndefined("yAlways", [["yOnTranslate",true]]);
    checkUndefined("useSnapping", []);
    checkUndefined("itemSnapping", [["useSnapping",true]]);
    checkUndefined("worldSnapping", [["useSnapping",true]]);
    checkUndefined("showFollowButton", []);
    checkUndefined("useFOVFollow", [["showFollowButton",true]]);
    checkUndefined("isFollowing", [["useFOVFollow",true]]);
    checkUndefined("showCloseButton", []);
    checkUndefined("_enableInteractionPlane", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
