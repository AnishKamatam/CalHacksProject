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
// @input int buttonType {"widget":"combobox", "values":[{"label":"Pinch Button", "value":0}, {"label":"Toggle Button", "value":1}, {"label":"State Button", "value":2}]}
// @ui {"widget":"separator"}
// @input Component.RenderMeshVisual renderMeshVisual
// @input bool useGlowMesh {"showIf":"buttonType", "showIfValue":0}
// @input Component.RenderMeshVisual glowRenderMeshVisual {"showIf":"useGlowMesh", "showIfValue":true}
// @input float maxBlendShapeWeight = 1
// @ui {"widget":"separator"}
// @input string meshBlendShapeName = "Pinch"
// @input Asset.Material meshIdleMaterial
// @input Asset.Material meshHoverMaterial
// @input Asset.Material meshPinchedMaterial
// @ui {"widget":"separator"}
// @input string glowBlendShapeName = "Pinch" {"showIf":"useGlowMesh", "showIfValue":true}
// @input Asset.Material glowIdleMaterial {"showIf":"useGlowMesh", "showIfValue":true}
// @input Asset.Material glowHoverMaterial {"showIf":"useGlowMesh", "showIfValue":true}
// @input Asset.Material glowPinchedMaterial {"showIf":"useGlowMesh", "showIfValue":true}
// @input Asset.Material meshToggledPinchedMaterial {"showIf":"buttonType", "showIfValue":1}
// @input Asset.Material meshToggledHoverMaterial {"showIf":"buttonType", "showIfValue":1}
// @input Asset.Material meshToggledIdleMaterial {"showIf":"buttonType", "showIfValue":1}
// @input Asset.Material meshStatePinchedMaterial {"showIf":"buttonType", "showIfValue":2}
// @input Asset.Material meshStateHoverMaterial {"showIf":"buttonType", "showIfValue":2}
// @input Asset.Material meshStateIdleMaterial {"showIf":"buttonType", "showIfValue":2}
// @input bool persistentPinchedState {"showIf":"buttonType", "showIfValue":2}
// @ui {"widget":"separator"}
// @input Asset.Texture defaultIcon
// @input Asset.Texture onIcon
if (!global.BaseScriptComponent) {
    function BaseScriptComponent() {}
    global.BaseScriptComponent = BaseScriptComponent;
    global.BaseScriptComponent.prototype = Object.getPrototypeOf(script);
    global.BaseScriptComponent.prototype.__initialize = function () {};
    global.BaseScriptComponent.getTypeName = function () {
        throw new Error("Cannot get type name from the class, not decorated with @component");
    };
}
var Module = require("../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Helpers/ButtonFeedback");
Object.setPrototypeOf(script, Module.ButtonFeedback.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("buttonType", []);
    checkUndefined("renderMeshVisual", []);
    checkUndefined("useGlowMesh", [["buttonType",0]]);
    checkUndefined("maxBlendShapeWeight", []);
    checkUndefined("meshBlendShapeName", []);
    checkUndefined("meshIdleMaterial", []);
    checkUndefined("meshHoverMaterial", []);
    checkUndefined("meshPinchedMaterial", []);
    checkUndefined("persistentPinchedState", [["buttonType",2]]);
    if (script.onAwake) {
       script.onAwake();
    }
});
