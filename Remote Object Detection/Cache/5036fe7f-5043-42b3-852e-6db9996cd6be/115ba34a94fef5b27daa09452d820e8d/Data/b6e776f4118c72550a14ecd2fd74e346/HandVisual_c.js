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
// @ui {"widget":"group_start", "label":"Hand Visual"}
// @input string handType {"widget":"combobox", "values":[{"label":"Left", "value":"left"}, {"label":"Right", "value":"right"}]}
// @input string selectVisual = "Default" {"widget":"combobox", "values":[{"label":"Default", "value":"Default"}, {"label":"Occluder", "value":"Occluder"}]}
// @input AssignableType handInteractor
// @input Component.RenderMeshVisual handMesh
// @input float handMeshRenderOrder = 9999 {"hint":"The desired render order of the handMesh"}
// @input SceneObject root {"hint":"Parent of both the rig and the mesh"}
// @input bool autoJointMapping = true {"hint":"If checked the HandVisual will attempt to automatically wire joints"}
// @ui {"widget":"group_start", "label":"Joint Setup", "showIf":"autoJointMapping", "showIfValue":false}
// @input SceneObject wrist
// @input SceneObject thumbToWrist
// @input SceneObject thumbBaseJoint
// @input SceneObject thumbKnuckle
// @input SceneObject thumbMidJoint
// @input SceneObject thumbTip
// @input SceneObject indexToWrist
// @input SceneObject indexKnuckle
// @input SceneObject indexMidJoint
// @input SceneObject indexUpperJoint
// @input SceneObject indexTip
// @input SceneObject middleToWrist
// @input SceneObject middleKnuckle
// @input SceneObject middleMidJoint
// @input SceneObject middleUpperJoint
// @input SceneObject middleTip
// @input SceneObject ringToWrist
// @input SceneObject ringKnuckle
// @input SceneObject ringMidJoint
// @input SceneObject ringUpperJoint
// @input SceneObject ringTip
// @input SceneObject pinkyToWrist
// @input SceneObject pinkyKnuckle
// @input SceneObject pinkyMidJoint
// @input SceneObject pinkyUpperJoint
// @input SceneObject pinkyTip
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Glow Effect"}
// @input bool shouldThumbPokeGlow {"hint":"Whether or not the thumb should glow when poking"}
// @input Asset.RenderMesh unitPlaneMesh {"hint":"The plane mesh on which the glow texture/material will be rendered"}
// @input Asset.Material tipGlowMaterial {"hint":"The material which will be manipulated to create the glow effect"}
// @input vec4 idleColor {"hint":"The color the glow will be when you are not pinching", "widget":"color"}
// @input vec4 pinchDownColor {"hint":"The color the glow will be when you are pinching", "widget":"color"}
// @input float tapProximityThreshold {"hint":"How close index finger of tapping hand has to be to tapped hand to initiate tap glow"}
// @input Asset.Texture pinchTexture {"hint":"The texture applied to the hand when creating pinch glow effect"}
// @input Asset.Texture tapTexture {"hint":"The texture applied to the hand when creating tap glow effect"}
// @input float tipGlowRenderOrder = 10000 {"hint":"The render order of the quad on which the tip glow effect occurs"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Radial Gradient Occlusion"}
// @input bool occluderEnabled {"hint":"Whether or not the radial gradient occluder is enabled"}
// @input Asset.RenderMesh occluderUnitPlaneMesh {"hint":"The plane mesh the radial gradient occluder will be rendered"}
// @input Asset.Material radialGradientOcclusionMaterial {"hint":"The material which will be create the gradient occlusion effect"}
// @input float gradientQuadRenderOrder = 9997 {"hint":"The render order of the gradient quad tracked to the hand"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_end"}
// @ui {"widget":"group_start", "label":"Hand Mesh Materials"}
// @input Asset.Material handOutlineMaterial {"hint":"The material which will be create the default visual effect on the hand mesh"}
// @input Asset.Material handOccluderMaterial {"hint":"The material which will be create the occluder visual effect on the hand mesh"}
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
var Module = require("../../../../../../../Modules/Src/Assets/SpectaclesInteractionKit/Components/Interaction/HandVisual/HandVisual");
Object.setPrototypeOf(script, Module.HandVisual.prototype);
script.__initialize();
let awakeEvent = script.createEvent("OnAwakeEvent");
awakeEvent.bind(() => {
    checkUndefined("handType", []);
    checkUndefined("selectVisual", []);
    checkUndefined("handInteractor", []);
    checkUndefined("handMesh", []);
    checkUndefined("handMeshRenderOrder", []);
    checkUndefined("root", []);
    checkUndefined("autoJointMapping", []);
    checkUndefined("shouldThumbPokeGlow", []);
    checkUndefined("unitPlaneMesh", []);
    checkUndefined("tipGlowMaterial", []);
    checkUndefined("idleColor", []);
    checkUndefined("pinchDownColor", []);
    checkUndefined("tapProximityThreshold", []);
    checkUndefined("tipGlowRenderOrder", []);
    checkUndefined("occluderEnabled", []);
    checkUndefined("occluderUnitPlaneMesh", []);
    checkUndefined("radialGradientOcclusionMaterial", []);
    checkUndefined("gradientQuadRenderOrder", []);
    checkUndefined("handOutlineMaterial", []);
    checkUndefined("handOccluderMaterial", []);
    if (script.onAwake) {
       script.onAwake();
    }
});
