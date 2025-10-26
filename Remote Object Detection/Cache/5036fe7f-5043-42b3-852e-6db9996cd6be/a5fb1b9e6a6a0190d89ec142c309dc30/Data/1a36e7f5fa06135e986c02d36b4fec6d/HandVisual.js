"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandVisual = exports.HandVisualSelection = void 0;
var __selfType = requireType("./HandVisual");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const HandInputData_1 = require("../../../Providers/HandInputData/HandInputData");
const InteractionConfigurationProvider_1 = require("../../../Providers/InteractionConfigurationProvider/InteractionConfigurationProvider");
const InputChecker_1 = require("../../../Utils/InputChecker");
const SceneObjectUtils_1 = require("../../../Utils/SceneObjectUtils");
const validate_1 = require("../../../Utils/validate");
const GlowEffectView_1 = require("./GlowEffectView");
const RadialOcclusionView_1 = require("./RadialOcclusionView");
const TAG = "HandVisual";
var HandVisualSelection;
(function (HandVisualSelection) {
    HandVisualSelection["Default"] = "Default";
    HandVisualSelection["Occluder"] = "Occluder";
})(HandVisualSelection || (exports.HandVisualSelection = HandVisualSelection = {}));
/**
 * This class provides a visual representation of the hand, with the ability to automatically wire joints to the hand mesh. It also provides the ability to add a radial gradient occlusion effect and a glow effect to the hand mesh.
 */
let HandVisual = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var HandVisual = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.handType = this.handType;
            this.selectVisual = this.selectVisual;
            this.handInteractor = this.handInteractor;
            this.handMesh = this.handMesh;
            this.handMeshRenderOrder = this.handMeshRenderOrder;
            this.root = this.root;
            this.autoJointMapping = this.autoJointMapping;
            this.wrist = this.wrist;
            this.thumbToWrist = this.thumbToWrist;
            this.thumbBaseJoint = this.thumbBaseJoint;
            this.thumbKnuckle = this.thumbKnuckle;
            this.thumbMidJoint = this.thumbMidJoint;
            this.thumbTip = this.thumbTip;
            this.indexToWrist = this.indexToWrist;
            this.indexKnuckle = this.indexKnuckle;
            this.indexMidJoint = this.indexMidJoint;
            this.indexUpperJoint = this.indexUpperJoint;
            this.indexTip = this.indexTip;
            this.middleToWrist = this.middleToWrist;
            this.middleKnuckle = this.middleKnuckle;
            this.middleMidJoint = this.middleMidJoint;
            this.middleUpperJoint = this.middleUpperJoint;
            this.middleTip = this.middleTip;
            this.ringToWrist = this.ringToWrist;
            this.ringKnuckle = this.ringKnuckle;
            this.ringMidJoint = this.ringMidJoint;
            this.ringUpperJoint = this.ringUpperJoint;
            this.ringTip = this.ringTip;
            this.pinkyToWrist = this.pinkyToWrist;
            this.pinkyKnuckle = this.pinkyKnuckle;
            this.pinkyMidJoint = this.pinkyMidJoint;
            this.pinkyUpperJoint = this.pinkyUpperJoint;
            this.pinkyTip = this.pinkyTip;
            this.shouldThumbPokeGlow = this.shouldThumbPokeGlow;
            this.unitPlaneMesh = this.unitPlaneMesh;
            this.tipGlowMaterial = this.tipGlowMaterial;
            this.idleColor = this.idleColor;
            this.pinchDownColor = this.pinchDownColor;
            this.tapProximityThreshold = this.tapProximityThreshold;
            this.pinchTexture = this.pinchTexture;
            this.tapTexture = this.tapTexture;
            this.tipGlowRenderOrder = this.tipGlowRenderOrder;
            this.occluderEnabled = this.occluderEnabled;
            this.occluderUnitPlaneMesh = this.occluderUnitPlaneMesh;
            this.radialGradientOcclusionMaterial = this.radialGradientOcclusionMaterial;
            this.gradientQuadRenderOrder = this.gradientQuadRenderOrder;
            this.handOutlineMaterial = this.handOutlineMaterial;
            this.handOccluderMaterial = this.handOccluderMaterial;
            this.handProvider = HandInputData_1.HandInputData.getInstance();
            this.interactionConfigurationProvider = InteractionConfigurationProvider_1.InteractionConfigurationProvider.getInstance();
            this.inputChecker = new InputChecker_1.InputChecker(TAG);
            // eslint-disable-next-line @typescript-eslint/no-inferrable-types
            this._enabled = true;
            this._handVisualSelection = this
                .selectVisual;
            this.initialized = false;
        }
        __initialize() {
            super.__initialize();
            this.handType = this.handType;
            this.selectVisual = this.selectVisual;
            this.handInteractor = this.handInteractor;
            this.handMesh = this.handMesh;
            this.handMeshRenderOrder = this.handMeshRenderOrder;
            this.root = this.root;
            this.autoJointMapping = this.autoJointMapping;
            this.wrist = this.wrist;
            this.thumbToWrist = this.thumbToWrist;
            this.thumbBaseJoint = this.thumbBaseJoint;
            this.thumbKnuckle = this.thumbKnuckle;
            this.thumbMidJoint = this.thumbMidJoint;
            this.thumbTip = this.thumbTip;
            this.indexToWrist = this.indexToWrist;
            this.indexKnuckle = this.indexKnuckle;
            this.indexMidJoint = this.indexMidJoint;
            this.indexUpperJoint = this.indexUpperJoint;
            this.indexTip = this.indexTip;
            this.middleToWrist = this.middleToWrist;
            this.middleKnuckle = this.middleKnuckle;
            this.middleMidJoint = this.middleMidJoint;
            this.middleUpperJoint = this.middleUpperJoint;
            this.middleTip = this.middleTip;
            this.ringToWrist = this.ringToWrist;
            this.ringKnuckle = this.ringKnuckle;
            this.ringMidJoint = this.ringMidJoint;
            this.ringUpperJoint = this.ringUpperJoint;
            this.ringTip = this.ringTip;
            this.pinkyToWrist = this.pinkyToWrist;
            this.pinkyKnuckle = this.pinkyKnuckle;
            this.pinkyMidJoint = this.pinkyMidJoint;
            this.pinkyUpperJoint = this.pinkyUpperJoint;
            this.pinkyTip = this.pinkyTip;
            this.shouldThumbPokeGlow = this.shouldThumbPokeGlow;
            this.unitPlaneMesh = this.unitPlaneMesh;
            this.tipGlowMaterial = this.tipGlowMaterial;
            this.idleColor = this.idleColor;
            this.pinchDownColor = this.pinchDownColor;
            this.tapProximityThreshold = this.tapProximityThreshold;
            this.pinchTexture = this.pinchTexture;
            this.tapTexture = this.tapTexture;
            this.tipGlowRenderOrder = this.tipGlowRenderOrder;
            this.occluderEnabled = this.occluderEnabled;
            this.occluderUnitPlaneMesh = this.occluderUnitPlaneMesh;
            this.radialGradientOcclusionMaterial = this.radialGradientOcclusionMaterial;
            this.gradientQuadRenderOrder = this.gradientQuadRenderOrder;
            this.handOutlineMaterial = this.handOutlineMaterial;
            this.handOccluderMaterial = this.handOccluderMaterial;
            this.handProvider = HandInputData_1.HandInputData.getInstance();
            this.interactionConfigurationProvider = InteractionConfigurationProvider_1.InteractionConfigurationProvider.getInstance();
            this.inputChecker = new InputChecker_1.InputChecker(TAG);
            // eslint-disable-next-line @typescript-eslint/no-inferrable-types
            this._enabled = true;
            this._handVisualSelection = this
                .selectVisual;
            this.initialized = false;
        }
        /**
         * Sets the selection of the hand visual to present to user
         */
        set visualSelection(selection) {
            this._handVisualSelection = selection;
            this.glowEffectView?.setVisualSelection(selection);
        }
        /**
         * @returns the current selection of the hand visual to present to user
         */
        get visualSelection() {
            return this._handVisualSelection;
        }
        defineScriptEvents() {
            this.createEvent("OnStartEvent").bind(() => {
                this.initialize();
            });
            this.createEvent("OnEnableEvent").bind(() => {
                this.defineOnEnableBehavior();
            });
            this.createEvent("OnDisableEvent").bind(() => {
                this.defineOnDisableBehavior();
            });
            this.createEvent("OnDestroyEvent").bind(() => {
                this.defineOnDestroyBehavior();
            });
        }
        defineOnEnableBehavior() {
            this.setEnabled(true);
        }
        defineOnDisableBehavior() {
            this.setEnabled(false);
        }
        defineOnDestroyBehavior() {
            if (this.glowEffectView !== undefined) {
                this.glowEffectView.destroy();
            }
            if (this.radialOcclusionView !== undefined) {
                this.radialOcclusionView.destroy();
            }
            this.hand?.detachHandVisuals(this);
        }
        defineHandEvents() {
            (0, validate_1.validate)(this.hand);
            this.hand.onEnabledChanged.add((enabled) => {
                this._enabled = enabled;
                // We shouldn't turn on the hand visuals until the hand has actually been found.
                if (!enabled) {
                    this.setEnabled(false);
                }
            });
            this.hand.onHandFound.add(() => {
                if (this._enabled) {
                    this.setEnabled(true);
                }
            });
            this.hand.onHandLost.add(() => {
                if (this._enabled) {
                    this.setEnabled(false);
                }
            });
        }
        getJointSceneObject(targetSceneObjectName, root) {
            const sceneObject = (0, SceneObjectUtils_1.findSceneObjectByName)(root, targetSceneObjectName);
            if (sceneObject === null) {
                throw new Error(`${targetSceneObjectName} could not be found in children of SceneObject: ${this.root?.name}`);
            }
            return sceneObject;
        }
        setEnabled(enabled) {
            if (this.glowEffectView !== undefined) {
                this.glowEffectView.enabled = enabled;
            }
            if (this.radialOcclusionView !== undefined) {
                this.radialOcclusionView.enabled = enabled;
            }
            this.handMesh.enabled = enabled;
        }
        onAwake() {
            if (this.handType !== "right") {
                this.hand = this.handProvider.getHand("left");
            }
            else {
                this.hand = this.handProvider.getHand("right");
            }
            this.hand.attachHandVisuals(this);
            this.defineHandEvents();
            this.defineScriptEvents();
            this.handMesh.setRenderOrder(this.handMeshRenderOrder);
            /*
             * HandVisuals were not working correctly with frustum culling,
             * instead manually define the AABB for frustum culling
             */
            const min = this.handMesh.mesh.aabbMin;
            const max = this.handMesh.mesh.aabbMax;
            const pass = this.handMesh.mainMaterial.mainPass;
            pass.frustumCullMode = FrustumCullMode.UserDefinedAABB;
            pass.frustumCullMin = min;
            pass.frustumCullMax = max;
        }
        initialize() {
            if (this.initialized) {
                return;
            }
            (0, validate_1.validate)(this.hand);
            this.wrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist", this.root)
                : this.wrist;
            this.thumbToWrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist_to_thumb", this.root)
                : this.thumbToWrist;
            this.thumbBaseJoint = this.autoJointMapping
                ? this.getJointSceneObject("thumb-0", this.root)
                : this.thumbBaseJoint;
            this.thumbKnuckle = this.autoJointMapping
                ? this.getJointSceneObject("thumb-1", this.root)
                : this.thumbKnuckle;
            this.thumbMidJoint = this.autoJointMapping
                ? this.getJointSceneObject("thumb-2", this.root)
                : this.thumbMidJoint;
            this.thumbTip = this.autoJointMapping
                ? this.getJointSceneObject("thumb-3", this.root)
                : this.thumbTip;
            this.indexToWrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist_to_index", this.root)
                : this.indexToWrist;
            this.indexKnuckle = this.autoJointMapping
                ? this.getJointSceneObject("index-0", this.root)
                : this.indexKnuckle;
            this.indexMidJoint = this.autoJointMapping
                ? this.getJointSceneObject("index-1", this.root)
                : this.indexMidJoint;
            this.indexUpperJoint = this.autoJointMapping
                ? this.getJointSceneObject("index-2", this.root)
                : this.indexUpperJoint;
            this.indexTip = this.autoJointMapping
                ? this.getJointSceneObject("index-3", this.root)
                : this.indexTip;
            this.middleToWrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist_to_mid", this.root)
                : this.middleToWrist;
            this.middleKnuckle = this.autoJointMapping
                ? this.getJointSceneObject("mid-0", this.root)
                : this.middleKnuckle;
            this.middleMidJoint = this.autoJointMapping
                ? this.getJointSceneObject("mid-1", this.root)
                : this.middleMidJoint;
            this.middleUpperJoint = this.autoJointMapping
                ? this.getJointSceneObject("mid-2", this.root)
                : this.middleUpperJoint;
            this.middleTip = this.autoJointMapping
                ? this.getJointSceneObject("mid-3", this.root)
                : this.middleTip;
            this.ringToWrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist_to_ring", this.root)
                : this.ringToWrist;
            this.ringKnuckle = this.autoJointMapping
                ? this.getJointSceneObject("ring-0", this.root)
                : this.ringKnuckle;
            this.ringMidJoint = this.autoJointMapping
                ? this.getJointSceneObject("ring-1", this.root)
                : this.ringMidJoint;
            this.ringUpperJoint = this.autoJointMapping
                ? this.getJointSceneObject("ring-2", this.root)
                : this.ringUpperJoint;
            this.ringTip = this.autoJointMapping
                ? this.getJointSceneObject("ring-3", this.root)
                : this.ringTip;
            this.pinkyToWrist = this.autoJointMapping
                ? this.getJointSceneObject("wrist_to_pinky", this.root)
                : this.pinkyToWrist;
            this.pinkyKnuckle = this.autoJointMapping
                ? this.getJointSceneObject("pinky-0", this.root)
                : this.pinkyKnuckle;
            this.pinkyMidJoint = this.autoJointMapping
                ? this.getJointSceneObject("pinky-1", this.root)
                : this.pinkyMidJoint;
            this.pinkyUpperJoint = this.autoJointMapping
                ? this.getJointSceneObject("pinky-2", this.root)
                : this.pinkyUpperJoint;
            this.pinkyTip = this.autoJointMapping
                ? this.getJointSceneObject("pinky-3", this.root)
                : this.pinkyTip;
            this.initialized = true;
            // The joints are now ready and the effects can be initialized
            this.hand.initHandVisuals();
            // Only create glow effect if all required parameters are provided
            if (this.unitPlaneMesh && this.tipGlowMaterial && this.idleColor && this.pinchDownColor &&
                this.tapProximityThreshold !== undefined && this.tapTexture && this.pinchTexture) {
                this.glowEffectView = new GlowEffectView_1.GlowEffectView({
                    handType: this.handType,
                    unitPlaneMesh: this.unitPlaneMesh,
                    tipGlowMaterial: this.tipGlowMaterial,
                    idleColor: this.idleColor,
                    pinchDownColor: this.pinchDownColor,
                    tapProximityThreshold: this.tapProximityThreshold,
                    tapTexture: this.tapTexture,
                    pinchTexture: this.pinchTexture,
                    tipGlowRenderOrder: this.tipGlowRenderOrder,
                    handInteractor: this.handInteractor,
                    visualSelection: this._handVisualSelection,
                    handOutlineMaterial: this.handOutlineMaterial,
                    handOccluderMaterial: this.handOccluderMaterial,
                    shouldThumbPokeGlow: this.shouldThumbPokeGlow,
                });
            }
            if (!this.occluderEnabled || !this.occluderUnitPlaneMesh || !this.radialGradientOcclusionMaterial) {
                return;
            }
            this.radialOcclusionView = new RadialOcclusionView_1.default({
                handType: this.handType,
                unitPlaneMesh: this.occluderUnitPlaneMesh,
                radialGradientOcclusionMaterial: this.radialGradientOcclusionMaterial,
                gradientQuadRenderOrder: this.gradientQuadRenderOrder,
            });
        }
    };
    __setFunctionName(_classThis, "HandVisual");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HandVisual = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HandVisual = _classThis;
})();
exports.HandVisual = HandVisual;
//# sourceMappingURL=HandVisual.js.map