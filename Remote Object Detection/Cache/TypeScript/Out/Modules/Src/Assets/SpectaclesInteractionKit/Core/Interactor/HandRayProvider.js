"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandRayProvider = void 0;
const HandInputData_1 = require("../../Providers/HandInputData/HandInputData");
const HandInteractor_1 = require("../HandInteractor/HandInteractor");
const RaycastAnchorHead_1 = require("./raycastAlgorithms/RaycastAnchorHead");
const RaycastAnchorVariableShoulder_1 = require("./raycastAlgorithms/RaycastAnchorVariableShoulder");
const RaycastLegacySingleCamera_1 = require("./raycastAlgorithms/RaycastLegacySingleCamera");
const RaycastProxy_1 = require("./raycastAlgorithms/RaycastProxy");
/**
 * This class provides raycasting functionality for hand interactions. It selects the appropriate raycast algorithm based on the provided configuration.
 */
class HandRayProvider {
    constructor(config) {
        this.config = config;
        this.handProvider = HandInputData_1.HandInputData.getInstance();
        this.hand = this.handProvider.getHand(this.config.handType);
        // Set raycast algorithm used
        switch (config.raycastAlgorithm) {
            case "LegacySingleCamera": {
                this.raycast = new RaycastLegacySingleCamera_1.default(this.hand);
                break;
            }
            case "AnchorHead": {
                this.raycast = new RaycastAnchorHead_1.default(this.hand);
                break;
            }
            case "Proxy": {
                this.raycast = new RaycastProxy_1.default(this.hand);
                break;
            }
            default: {
                this.raycast = new RaycastAnchorVariableShoulder_1.default(this.hand);
                break;
            }
        }
    }
    /** @inheritdoc */
    getRaycastInfo() {
        // When not near an InteractionPlane, use the raycast base's logic for direction / locus.
        if (this.config.handInteractor.fieldTargetingMode ===
            HandInteractor_1.FieldTargetingMode.FarField) {
            return (this.raycast.getRay() ?? {
                direction: vec3.zero(),
                locus: vec3.zero(),
            });
        }
        // When near an InteractionPlane, raycast from the midpoint straight towards the plane.
        else {
            const indexTip = this.hand.indexTip?.position;
            const thumbTip = this.hand.thumbTip?.position;
            if (indexTip === undefined || thumbTip === undefined) {
                return {
                    direction: vec3.zero(),
                    locus: vec3.zero(),
                };
            }
            const locus = indexTip.add(thumbTip).uniformScale(0.5);
            const planeProjection = this.config.handInteractor.currentInteractionPlane.projectPoint(locus);
            if (planeProjection === null) {
                return {
                    direction: vec3.zero(),
                    locus: vec3.zero(),
                };
            }
            else {
                return {
                    direction: planeProjection.point.sub(locus).normalize(),
                    locus: locus,
                };
            }
        }
    }
    /** @inheritdoc */
    isAvailable() {
        return ((this.hand.isInTargetingPose() && this.hand.isTracked()) ||
            this.hand.isPinching());
    }
    /** @inheritdoc */
    reset() {
        this.raycast.reset();
    }
}
exports.HandRayProvider = HandRayProvider;
//# sourceMappingURL=HandRayProvider.js.map