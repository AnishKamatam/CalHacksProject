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
exports.ScrollView = exports.EDGE_TYPE = exports.AXIS_DIRECTION = void 0;
var __selfType = requireType("./ScrollView");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const Interactor_1 = require("../../../Core/Interactor/Interactor");
const NativeLogger_1 = require("../../../Utils/NativeLogger");
const ScrollArea_1 = require("./ScrollArea");
const ScrollProvider_1 = require("./ScrollProvider");
const VisualBoundariesProvider_1 = require("./boundariesProvider/VisualBoundariesProvider");
exports.AXIS_DIRECTION = [-1, 0, 1];
exports.EDGE_TYPE = ["Content", "ScrollLimit"];
const TAG = "ScrollView";
/**
 * ScrollView will have two children:
 * - the content wrapper: created by ScrollView user
 * - scroll area: implemented internally by ScrollView
 * and not exposed to the user.
 *
 * To avoid issues related to
 * initialization order, we check the number of children
 * on StartEvent
 */
const EXPECTED_CHILDREN_COUNT = 2;
/**
 * This class is responsible for creating and positioning grid content items based on a specified prefab and item count. It instantiates the items and arranges them vertically with a specified offset.
 */
let ScrollView = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var ScrollView = _classThis = class extends _classSuper {
        constructor() {
            super();
            // Native Logging
            this.log = new NativeLogger_1.default(TAG);
            this.updateEvent = this.createEvent("UpdateEvent");
            this._debugDrawEnabled = this._debugDrawEnabled;
            this.enableHorizontalScroll = this.enableHorizontalScroll;
            this.enableVerticalScroll = this.enableVerticalScroll;
            this._enableScrollInertia = this._enableScrollInertia;
            this.enableScrollLimit = this.enableScrollLimit;
            this._scrollLimit = this._scrollLimit;
            this.scrollAreaBounds = this.scrollAreaBounds;
            this.recomputeBoundaries = () => {
                if (!this.scrollProvider.isReady) {
                    this.log.w("recomputeBoundaries called before OnStartEvent. Call ignored.");
                }
                else {
                    this.scrollProvider.recomputeBoundaries();
                }
            };
            this.deferOnReady = (callback) => {
                if (!this.scrollProvider.isReady) {
                    this.scrollProvider.onReady.add(callback);
                }
                else {
                    callback();
                }
            };
            this.snapToEdges = (selectedEdges) => {
                this.deferOnReady(() => this.scrollProvider.snapToEdges(selectedEdges));
            };
            this.scrollBy = (dragVector) => {
                this.deferOnReady(() => this.scrollProvider.scrollBy(dragVector));
            };
        }
        __initialize() {
            super.__initialize();
            // Native Logging
            this.log = new NativeLogger_1.default(TAG);
            this.updateEvent = this.createEvent("UpdateEvent");
            this._debugDrawEnabled = this._debugDrawEnabled;
            this.enableHorizontalScroll = this.enableHorizontalScroll;
            this.enableVerticalScroll = this.enableVerticalScroll;
            this._enableScrollInertia = this._enableScrollInertia;
            this.enableScrollLimit = this.enableScrollLimit;
            this._scrollLimit = this._scrollLimit;
            this.scrollAreaBounds = this.scrollAreaBounds;
            this.recomputeBoundaries = () => {
                if (!this.scrollProvider.isReady) {
                    this.log.w("recomputeBoundaries called before OnStartEvent. Call ignored.");
                }
                else {
                    this.scrollProvider.recomputeBoundaries();
                }
            };
            this.deferOnReady = (callback) => {
                if (!this.scrollProvider.isReady) {
                    this.scrollProvider.onReady.add(callback);
                }
                else {
                    callback();
                }
            };
            this.snapToEdges = (selectedEdges) => {
                this.deferOnReady(() => this.scrollProvider.snapToEdges(selectedEdges));
            };
            this.scrollBy = (dragVector) => {
                this.deferOnReady(() => this.scrollProvider.scrollBy(dragVector));
            };
        }
        onAwake() {
            this.scrollArea = this.createScrollArea();
            this.scrollProvider = this.createScrollProvider(this.scrollArea);
            this.mask = this.sceneObject.createComponent("Component.MaskingComponent");
            this.defineScriptEvents();
        }
        onDestroy() {
            this.scrollArea.destroy();
        }
        createScrollArea() {
            const scrollArea = new ScrollArea_1.ScrollArea({
                debugDrawEnabled: this.debugDrawEnabled,
                parentSceneObject: this.sceneObject,
                scrollAreaBounds: this.scrollAreaBounds,
            });
            return scrollArea;
        }
        createScrollProvider(scrollArea) {
            const scrollProvider = new ScrollProvider_1.ScrollProvider({
                scrollArea: this.scrollArea.boundariesProvider,
                scrollLimit: this.scrollLimit,
                enableScrollInertia: this.enableScrollInertia,
                enableScrollLimit: this.enableScrollLimit,
                enableHorizontalScroll: this.enableHorizontalScroll,
                enableVerticalScroll: this.enableVerticalScroll,
                scrollView: this,
                screenTransform: this.sceneObject.getComponent("Component.ScreenTransform"),
                updateEvent: this.updateEvent,
            });
            scrollArea.onDragStart.add((event) => {
                this.processPlanecastDrag(event);
                this.processTouchpadDrag(event);
            });
            scrollArea.onDragUpdate.add((event) => {
                this.processPlanecastDrag(event);
                this.processTouchpadDrag(event);
            });
            scrollArea.onDragEnd.add((event) => {
                scrollProvider.onGrabEnd(event);
            });
            scrollArea.onTriggerStart.add((event) => {
                scrollProvider.onGrabStart(event);
            });
            return scrollProvider;
        }
        createContentBoundariesProvider() {
            if (this.sceneObject.getChildrenCount() !== EXPECTED_CHILDREN_COUNT) {
                throw new Error("ScrollView requires exactly one child that wraps the content");
            }
            let contentSceneObject;
            for (const child of this.sceneObject.children) {
                if (child !== this.scrollArea.getSceneObject()) {
                    contentSceneObject = child;
                }
            }
            if (contentSceneObject === undefined) {
                throw new Error("Couldn't find content scene object among ScrollView children.");
            }
            return new VisualBoundariesProvider_1.VisualBoundariesProvider(contentSceneObject);
        }
        defineScriptEvents() {
            this.createEvent("OnDestroyEvent").bind(() => this.onDestroy());
            this.createEvent("OnStartEvent").bind(() => {
                this.contentBoundariesProvider = this.createContentBoundariesProvider();
                this.scrollProvider.setContent(this.contentBoundariesProvider);
                this.scrollProvider.snapToEdges({ x: -1, y: 1, type: "Content" });
                this.scrollProvider.resetContentOrigin();
                // We recompute boundaries once more to ensure that the scroll limit anchor is set properly.
                this.scrollProvider.recomputeBoundaries();
            });
        }
        get onScrollUpdate() {
            return this.scrollProvider.onScrollUpdate;
        }
        get onSnapUpdate() {
            return this.scrollProvider.onSnapUpdate;
        }
        get onReady() {
            return this.scrollProvider.onReady;
        }
        get onFocusEnter() {
            return this.scrollArea.onFocusEnter;
        }
        get onFocusExit() {
            return this.scrollArea.onFocusExit;
        }
        get debugDrawEnabled() {
            return this._debugDrawEnabled;
        }
        set debugDrawEnabled(debugDrawEnabled) {
            if (debugDrawEnabled === this._debugDrawEnabled) {
                return;
            }
            this._debugDrawEnabled = debugDrawEnabled;
            this.scrollArea.debugDrawEnabled = debugDrawEnabled;
        }
        get enableScrollInertia() {
            return this._enableScrollInertia;
        }
        set enableScrollInertia(enableScrollInertia) {
            if (enableScrollInertia === this._enableScrollInertia) {
                return;
            }
            this._enableScrollInertia = enableScrollInertia;
            this.scrollProvider.enableScrollInertia = enableScrollInertia;
        }
        get scrollLimit() {
            return this._scrollLimit;
        }
        set scrollLimit(limit) {
            if (this._scrollLimit === limit) {
                return;
            }
            this._scrollLimit = limit;
            this.scrollProvider.scrollLimit = limit;
        }
        get contentPosition() {
            return this.scrollProvider.contentPosition;
        }
        set contentPosition(position) {
            this.scrollProvider.contentPosition = position;
        }
        /**
         * @returns the offset to each content edge and the ScrollArea in world units relative to the canvas' rotation.
         */
        get contentOffset() {
            return this.scrollProvider.convertLocalOffsetToParentOffset(this.scrollProvider.contentOffset);
        }
        /**
         * @returns the length of the content along the y-axis in local units relative to the ScrollView canvas.
         */
        get contentLength() {
            return this.scrollProvider.contentLength;
        }
        /**
         * @param length - the length of the content along the y-axis in local units relative to the ScrollView canvas.
         */
        set contentLength(length) {
            if (length === this.scrollProvider.contentLength) {
                return;
            }
            this.scrollProvider.contentLength = length;
        }
        /**
         * Resets the content origin for the purpose of calculating scrollPercentage.
         * Assumes that the ScrollView is currently at the top of content in the pooling use case.
         */
        resetContentOrigin() {
            this.scrollProvider.resetContentOrigin();
        }
        /**
         * @returns the ScrollArea's size in local units relative to the ScrollView canvas.
         */
        get scrollAreaSize() {
            return this.scrollProvider.convertLocalUnitsToParentUnits(this.scrollArea.boundariesProvider.size);
        }
        /**
         * @returns the ScrollArea collider's BoxShape's bounds.
         */
        get scrollColliderBounds() {
            return this.scrollArea.scrollColliderBounds;
        }
        /**
         * @param bounds - the ScrollArea collider's BoxShape's bounds.
         */
        set scrollColliderBounds(bounds) {
            this.scrollArea.scrollColliderBounds = bounds;
        }
        /**
         * @returns the amount of content overflow along the y-axis in local units relative to the ScrollView's canvas.
         */
        get overflow() {
            return this.scrollProvider.overflow;
        }
        /**
         * @returns the scroll percentage of the ScrollView (0=top of ScrollView, 1= bottom).
         */
        get scrollPercentage() {
            return this.scrollProvider.scrollPercentage;
        }
        /**
         * Checks if both inputted content edges are fully visible in the ScrollArea.
         * @param xEdge - 0 if not checking any x-axis edge, 1 for right edge, -1 for left edge.
         * @param yEdge - 0 if not checking any y-axis edge, 1 for top edge, -1 for bottom edge.
         */
        checkContentEdgeFullyVisible(xEdge, yEdge) {
            return this.scrollProvider.checkContentEdgeFullyVisible(xEdge, yEdge);
        }
        localizeDragVector(dragVector) {
            const transform = this.sceneObject.getTransform();
            const localXAxis = transform.getWorldRotation().multiplyVec3(vec3.right());
            const localYAxis = transform.getWorldRotation().multiplyVec3(vec3.up());
            const localizedX = localXAxis.dot(dragVector) / transform.getWorldScale().x;
            const localizedY = localYAxis.dot(dragVector) / transform.getWorldScale().y;
            return new vec2(localizedX, localizedY);
        }
        localizeTouchpadVector(touchpadVector) {
            const screenTransform = this.sceneObject.getComponent("Component.ScreenTransform");
            // Mobile touchpad drag uses a screen space of [0,1], while screen transforms use a screen space of [-1,1]
            const touchpadVector2D = new vec2(touchpadVector.x * 2, touchpadVector.y * 2);
            const origin = screenTransform.localPointToWorldPoint(vec2.zero());
            const worldSpaceVector = screenTransform
                .localPointToWorldPoint(touchpadVector2D)
                .sub(origin);
            return this.localizeDragVector(worldSpaceVector);
        }
        processPlanecastDrag(event) {
            if (event.planecastDragVector === null) {
                return;
            }
            const localDrag = this.localizeDragVector(event.planecastDragVector);
            this.scrollProvider.scrollBy(localDrag);
        }
        processTouchpadDrag(event) {
            if (event.interactor.inputType === Interactor_1.InteractorInputType.Mobile) {
                const mobileInteractor = event.interactor;
                if (mobileInteractor.touchpadDragVector !== null) {
                    const screenSpaceTouchpadDrag = mobileInteractor.touchpadDragVector?.uniformScale(1 / mobileInteractor.touchpadScrollSpeed) ?? vec3.zero();
                    this.scrollProvider.scrollBy(this.localizeTouchpadVector(screenSpaceTouchpadDrag));
                }
            }
        }
    };
    __setFunctionName(_classThis, "ScrollView");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ScrollView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ScrollView = _classThis;
})();
exports.ScrollView = ScrollView;
//# sourceMappingURL=ScrollView.js.map