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
exports.PinholeCapture = void 0;
var __selfType = requireType("./PinholeCapture");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const WorldCameraFinderProvider_1 = require("SpectaclesInteractionKit/Providers/CameraProvider/WorldCameraFinderProvider");
const PinholeCameraModel_1 = require("./PinholeCameraModel");
let PinholeCapture = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var PinholeCapture = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.cameraModule = require("LensStudio:CameraModule");
        }
        __initialize() {
            super.__initialize();
            this.cameraModule = require("LensStudio:CameraModule");
        }
        onAwake() {
            this.createEvent("OnStartEvent").bind(() => {
                // Initialize camera module and its dependencies
                this.cameraRequest = CameraModule.createCameraRequest();
                this.cameraRequest.cameraId = CameraModule.CameraId.Right_Color;
                const cameraTexture = this.cameraModule.requestCamera(this.cameraRequest);
                this.cameraDevice = global.deviceInfoSystem.getTrackingCameraForId(this.cameraRequest.cameraId);
                this.cameraModel = PinholeCameraModel_1.PinholeCameraModel.create(this.cameraDevice);
                // crop to match the aspect ratio of the camera
                // 0.15 is the offset frm the resized vertex 
                /*
                this.cameraModel.crop(
                  this.cameraModel.resolution.uniformScale(0.15),
                  this.cameraModel.resolution.uniformScale(0.7)
                )
                  this.cameraModel.resize(new vec2(640, 480))
                  */
                this.mainCamera = WorldCameraFinderProvider_1.default.getInstance().getComponent();
            });
        }
        /*
         saveMatrix()  {
            this.viewToWorld = this.mainCamera
              .getTransform()
              .getWorldTransform();
              print("Called saveMatrix")
          }
              */
        saveMatrix() {
            if (!this.mainCamera) {
                print("Error: mainCamera is not initialized");
                return false;
            }
            try {
                this.viewToWorld = this.mainCamera.getTransform().getWorldTransform();
                print("Matrix saved successfully");
                return true;
            }
            catch (e) {
                print("Error saving matrix: " + e);
                return false;
            }
        }
        worldToCapture(worldPos) {
            const viewPos = this.viewToWorld.inverse().multiplyPoint(worldPos);
            const capturePos = this.cameraDevice.pose.multiplyPoint(viewPos);
            const captureUV = this.cameraModel.projectToUV(capturePos);
            return captureUV;
        }
        /*
          captureToWorld(captureUV: vec2, depth: number): vec3 {
            const capturePos = this.cameraModel.unprojectFromUV(captureUV, depth);
            const viewPos = this.cameraDevice.pose.inverse().multiplyPoint(capturePos);
            const worldPos = this.viewToWorld.multiplyPoint(viewPos);
            r
            */
        captureToWorld(captureUV, depth) {
            if (!this.viewToWorld) {
                print("Error: viewToWorld matrix is undefined. Call saveMatrix() first.");
                // Return a default position or null
                return new vec3(0, 0, 0);
            }
            const capturePos = this.cameraModel.unprojectFromUV(captureUV, depth);
            const viewPos = this.cameraDevice.pose.inverse().multiplyPoint(capturePos);
            const worldPos = this.viewToWorld.multiplyPoint(viewPos);
            return worldPos;
        }
    };
    __setFunctionName(_classThis, "PinholeCapture");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PinholeCapture = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PinholeCapture = _classThis;
})();
exports.PinholeCapture = PinholeCapture;
//# sourceMappingURL=PinholeCapture.js.map