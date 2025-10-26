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
exports.NewScript = void 0;
var __selfType = requireType("./WorldQueryModuleAdjuster");
function component(target) { target.getTypeName = function () { return __selfType; }; }
// import required modules
const WorldQueryModule = require("LensStudio:WorldQueryModule");
const SIK = require("SpectaclesInteractionKit/SIK").SIK;
const InteractorTriggerType = require("SpectaclesInteractionKit/Core/Interactor/Interactor").InteractorTriggerType;
// Import CameraService
const CameraService_1 = require("./CameraService");
let NewScript = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var NewScript = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.timeoutDuration = this.timeoutDuration; // Default 10 seconds
            this.container = this.container;
            this.filterEnabled = this.filterEnabled;
            this.isTimedOut = false;
        }
        __initialize() {
            super.__initialize();
            this.timeoutDuration = this.timeoutDuration; // Default 10 seconds
            this.container = this.container;
            this.filterEnabled = this.filterEnabled;
            this.isTimedOut = false;
        }
        onAwake() {
            // Initialize CameraService
            this.cameraService = CameraService_1.CameraService.getInstance();
            print("CameraService initialized in WorldQueryHitAdjuster");
            this.targetObject = this.sceneObject.getParent();
            // Start the timer
            this.startTime = getTime();
            this.isTimedOut = false;
            // create new hit session
            this.hitTestSession = this.createHitTestSession(this.filterEnabled);
            if (!this.sceneObject) {
                print("Please set Target Object input");
                return;
            }
            // create update event
            this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
        }
        createHitTestSession(filterEnabled) {
            // create hit test session with options
            var options = HitTestSessionOptions.create();
            options.filter = filterEnabled;
            var session = WorldQueryModule.createHitTestSessionWithOptions(options);
            return session;
        }
        onHitTestResult(results) {
            if (results === null) {
                //this.targetObject.enabled = false;
            }
            else {
                this.targetObject.enabled = true;
                // get hit information
                const hitPosition = results.position;
                // Set position
                this.targetObject.getTransform().setWorldPosition(hitPosition);
                print("Hit Position: " + hitPosition);
                // Get camera position
                const cameraPos = this.getCameraPosition();
                // Calculate direction in the XZ plane (for y-axis rotation only)
                const lookDir = new vec3(cameraPos.x - hitPosition.x, 0, // Zero out Y component for rotation only around Y axis
                cameraPos.z - hitPosition.z).normalize();
                // Create rotation that only affects the y-axis
                const yRotation = quat.lookAt(lookDir, vec3.up());
                // Apply the rotation
                this.targetObject.getTransform().setWorldRotation(yRotation);
                // Update the container's distance
                const distance = (hitPosition.distance(cameraPos)).toFixed(2).replace(".", ",");
                this.container.distanceFromCamera.text = "Distance: " + distance + " cm";
            }
        }
        onUpdate() {
            // If we've already timed out, do nothing.
            if (this.isTimedOut) {
                return;
            }
            // Check if the timeout duration has been exceeded.
            if (getTime() - this.startTime > this.timeoutDuration) {
                print("WorldQueryModuleAdjuster timed out after " +
                    this.timeoutDuration +
                    " seconds");
                this.isTimedOut = true;
                return;
            }
            print("Updating...");
            const rayStart = this.getCameraPosition();
            const pos1 = this.getCameraPosition();
            const pos2 = this.targetObject.getTransform().getWorldPosition();
            const direction = new vec3(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
            // Create rayEnd by manually adding scaled direction components.
            const rayEnd = new vec3(rayStart.x + direction.x * 1000, rayStart.y + direction.y * 1000, rayStart.z + direction.z * 1000);
            this.hitTestSession.hitTest(rayStart, rayEnd, this.onHitTestResult.bind(this));
        }
        getCameraPosition() {
            const mainCamera = this.cameraService.getCamera(CameraService_1.CameraType.Main);
            return mainCamera.getTransform().getWorldPosition();
        }
    };
    __setFunctionName(_classThis, "NewScript");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NewScript = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NewScript = _classThis;
})();
exports.NewScript = NewScript;
//# sourceMappingURL=WorldQueryModuleAdjuster.js.map