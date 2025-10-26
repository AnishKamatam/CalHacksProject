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
exports.InteractionPlane = void 0;
var __selfType = requireType("./InteractionPlane");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const InteractionManager_1 = require("../../../Core/InteractionManager/InteractionManager");
const DEFAULT_INTERACTION_ZONE_DISTANCE_CM = 20;
// The value to use to widen the interaction zone as it gets further away from the plane.
const DEFAULT_INTERACTION_ZONE_SLOPE = 0.25;
const DEFAULT_BEHIND_ZONE_DISTANCE_CM = 15;
/**
 * An InteractionPlane defines a zone which triggers near field targeting logic for HandInteractors.
 * An InteractionPlane should be added to any 2D UIs with high button density, such as ContainerFrame menus.
 * Only one InteractionPlane should be added per UI (ContainerFrame adds an InteractionPlane by default).
 */
let InteractionPlane = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var InteractionPlane = _classThis = class extends _classSuper {
        __initialize() {
            super.__initialize();
            this._planeSize = this._planeSize;
            this._proximityDistance = this._proximityDistance;
            this._drawDebug = this._drawDebug;
            this._behindDistance = this._behindDistance;
            this._collider = this.sceneObject.createComponent("ColliderComponent");
            this.createEvent("OnDestroyEvent").bind(() => this.release());
            InteractionManager_1.InteractionManager.getInstance().registerInteractionPlane(this);
            this.buildMeshShape();
            this.collider.debugDrawEnabled = this.drawDebug;
        }
        constructor() {
            super();
            this._planeSize = this._planeSize;
            this._proximityDistance = this._proximityDistance;
            this._drawDebug = this._drawDebug;
            this._behindDistance = this._behindDistance;
            this._collider = this.sceneObject.createComponent("ColliderComponent");
            this.createEvent("OnDestroyEvent").bind(() => this.release());
            InteractionManager_1.InteractionManager.getInstance().registerInteractionPlane(this);
            this.buildMeshShape();
            this.collider.debugDrawEnabled = this.drawDebug;
        }
        release() {
            InteractionManager_1.InteractionManager.getInstance().deregisterInteractionPlane(this);
        }
        // Manually create the mesh shape for the interaction zone to trigger NearField targeting.
        buildMeshShape() {
            const slopeOffset = DEFAULT_INTERACTION_ZONE_SLOPE * this.proximityDistance;
            const shape = Shape.createBoxShape();
            shape.size = new vec3(this.planeSize.x + slopeOffset, this.planeSize.y + slopeOffset, this.proximityDistance * 2);
            this.collider.shape = shape;
        }
        /**
         * Sets the size (in world units) of the plane's interaction zone along the local X and Y axes of the SceneObject.
         */
        set planeSize(size) {
            this._planeSize = size;
            this.buildMeshShape();
        }
        /**
         * @returns the size (in world units) of the plane's interaction zone along the local X and Y axes of the SceneObject.
         */
        get planeSize() {
            return this._planeSize;
        }
        /**
         * Sets the depth (in world units) of the plane's interaction zone along the local Z axis of the SceneObject.
         */
        set proximityDistance(distance) {
            this._proximityDistance = distance;
            this.buildMeshShape();
        }
        /**
         * Returns the depth (in world units) of the plane's interaction zone along the local Z axis of the SceneObject.
         */
        get proximityDistance() {
            return this._proximityDistance;
        }
        /**
         * Sets the depth (in world units) of the plane's behind zone along the local Z axis of the SceneObject.
         */
        set behindDistance(distance) {
            this._behindDistance = distance;
            this.buildMeshShape();
        }
        /**
         * Returns the depth (in world units) of the plane's interaction zone along the local Z axis of the SceneObject.
         */
        get behindDistance() {
            return this._behindDistance;
        }
        /**
         * Sets if the interaction zone should be drawn via debug gizmos.
         */
        set drawDebug(enabled) {
            this._drawDebug = enabled;
            this.collider.debugDrawEnabled = enabled;
        }
        /**
         * @returns if the interaction zone should be drawn via debug gizmos.
         */
        get drawDebug() {
            return this._drawDebug;
        }
        /**
         * @returns a vec3 representing the normal vector of the plane.
         */
        get normal() {
            return this.getTransform().forward;
        }
        /**
         * Returns the collider of the InteractionPlane.
         */
        get collider() {
            return this._collider;
        }
        /**
         * Project a 3D point in world space onto the InteractionPlane.
         * @param point - a 3D point in world space
         * @returns - a ZoneProjection representing the point's projection onto the plane, the distance of the point from the plane (negative if behind the plane),
         *            a boolean checking if the point resides within the interaction zone of the plane (defined by size and proximityDistance),
         *            and a boolean checking if the point resides within the behind zone of the plane (right behind the plane),
         *            or null if the point does not project onto the plane.
         */
        projectPoint(point) {
            if (!this.enabled || !this.sceneObject.isEnabledInHierarchy) {
                return null;
            }
            // This logic uses the equation of t = ((p0-l0)·n)/(l·n) with l0 + l*t = the point of intersection.
            // l0 represents point, l represents direction, p0 represents plane origin, and n represents the plane normal.
            const po = this.sceneObject.getTransform().getWorldPosition();
            const n = this.sceneObject.getTransform().forward;
            const v = po.sub(point);
            const l = n.uniformScale(-1);
            const t = v.dot(n) / l.dot(n);
            // Project the point onto the plane.
            const projectedPoint = point.add(l.uniformScale(t));
            const r = this.sceneObject.getTransform().right;
            const u = this.sceneObject.getTransform().up;
            // Get the local X and Y coordinates within the plane space to check if the point resides within the interaction zone.
            const d = projectedPoint.sub(po);
            const x = d.dot(r);
            const y = d.dot(u);
            // Get the distance of the original point from the plane.
            const distance = point.sub(projectedPoint).length * Math.sign(t);
            // Check if the point is in front of the plane, within the proximity distance threshold, and within the planeSize boundaries.
            const isWithinInteractionZone = distance >= 0 &&
                distance <= this.proximityDistance &&
                Math.abs(x) <=
                    this.planeSize.x + distance * DEFAULT_INTERACTION_ZONE_SLOPE &&
                Math.abs(y) <=
                    this.planeSize.y + distance * DEFAULT_INTERACTION_ZONE_SLOPE;
            // Check if the point is in behind the plane, within the behind zone distance threshold, and within the planeSize boundaries.
            const isWithinBehindZone = distance < 0 &&
                distance >= -this.behindDistance &&
                Math.abs(x) <= this.planeSize.x &&
                Math.abs(y) <= this.planeSize.y;
            // If the point is within the interaction zone, return the plane projection data. Otherwise, return null.
            const planeProjection = {
                point: projectedPoint,
                distance: distance,
                isWithinInteractionZone: isWithinInteractionZone,
                isWithinBehindZone: isWithinBehindZone,
            };
            return planeProjection;
        }
    };
    __setFunctionName(_classThis, "InteractionPlane");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InteractionPlane = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InteractionPlane = _classThis;
})();
exports.InteractionPlane = InteractionPlane;
//# sourceMappingURL=InteractionPlane.js.map