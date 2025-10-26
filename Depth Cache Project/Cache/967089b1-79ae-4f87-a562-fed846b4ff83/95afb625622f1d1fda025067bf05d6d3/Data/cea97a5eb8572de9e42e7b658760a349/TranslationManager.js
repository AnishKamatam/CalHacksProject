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
exports.TranslationManager = void 0;
var __selfType = requireType("./TranslationManager");
function component(target) { target.getTypeName = function () { return __selfType; }; }
/**
 * Standalone translation manager that handles Spanish translations
 * Works independently without modifying existing components
 */
let TranslationManager = (() => {
    let _classDecorators = [component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BaseScriptComponent;
    var TranslationManager = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.enableSpanishTranslation = this.enableSpanishTranslation;
            this.translations = {
                "hat": "el sombrero",
                "bottle": "la botella",
                "water bottle": "la botella de agua",
                "phone": "el teléfono",
                "cell phone": "el teléfono celular",
                "cup": "la taza",
                "mug": "la taza",
                "book": "el libro",
                "door": "la puerta",
                "window": "la ventana",
                "table": "la mesa",
                "chair": "la silla",
                "bed": "la cama",
                "lamp": "la lámpara",
                "light": "la luz",
                "computer": "la computadora",
                "laptop": "la computadora portátil",
                "keyboard": "el teclado",
                "mouse": "el ratón",
                "glasses": "las gafas",
                "pen": "el bolígrafo",
                "notebook": "el cuaderno",
                "backpack": "la mochila",
                "bag": "la bolsa",
                "shoes": "los zapatos",
                "shirt": "la camisa",
                "pants": "los pantalones",
                "jacket": "la chaqueta",
                "watch": "el reloj",
                "clock": "el reloj",
                "mirror": "el espejo",
                "picture": "el cuadro",
                "plant": "la planta",
                "pillow": "la almohada",
                "blanket": "la manta",
                "remote": "el control remoto",
                "remote control": "el control remoto",
                "tv": "el televisor",
                "television": "el televisor",
                "couch": "el sofá",
                "sofa": "el sofá",
                "refrigerator": "el refrigerador",
                "fridge": "el refrigerador",
                "microwave": "el microondas",
                "oven": "el horno",
                "stove": "la estufa",
                "sink": "el fregadero",
                "toilet": "el inodoro",
                "shower": "la ducha",
                "towel": "la toalla",
                "soap": "el jabón",
                "toothbrush": "el cepillo de dientes",
                "brush": "el cepillo",
                "comb": "el peine",
                "scissors": "las tijeras",
                "knife": "el cuchillo",
                "fork": "el tenedor",
                "spoon": "la cuchara",
                "plate": "el plato",
                "bowl": "el tazón",
                "glass": "el vaso",
                "napkin": "la servilleta",
                "car": "el carro",
                "house": "la casa",
                "person": "la persona",
                "man": "el hombre",
                "woman": "la mujer",
                "dog": "el perro",
                "cat": "el gato"
            };
        }
        __initialize() {
            super.__initialize();
            this.enableSpanishTranslation = this.enableSpanishTranslation;
            this.translations = {
                "hat": "el sombrero",
                "bottle": "la botella",
                "water bottle": "la botella de agua",
                "phone": "el teléfono",
                "cell phone": "el teléfono celular",
                "cup": "la taza",
                "mug": "la taza",
                "book": "el libro",
                "door": "la puerta",
                "window": "la ventana",
                "table": "la mesa",
                "chair": "la silla",
                "bed": "la cama",
                "lamp": "la lámpara",
                "light": "la luz",
                "computer": "la computadora",
                "laptop": "la computadora portátil",
                "keyboard": "el teclado",
                "mouse": "el ratón",
                "glasses": "las gafas",
                "pen": "el bolígrafo",
                "notebook": "el cuaderno",
                "backpack": "la mochila",
                "bag": "la bolsa",
                "shoes": "los zapatos",
                "shirt": "la camisa",
                "pants": "los pantalones",
                "jacket": "la chaqueta",
                "watch": "el reloj",
                "clock": "el reloj",
                "mirror": "el espejo",
                "picture": "el cuadro",
                "plant": "la planta",
                "pillow": "la almohada",
                "blanket": "la manta",
                "remote": "el control remoto",
                "remote control": "el control remoto",
                "tv": "el televisor",
                "television": "el televisor",
                "couch": "el sofá",
                "sofa": "el sofá",
                "refrigerator": "el refrigerador",
                "fridge": "el refrigerador",
                "microwave": "el microondas",
                "oven": "el horno",
                "stove": "la estufa",
                "sink": "el fregadero",
                "toilet": "el inodoro",
                "shower": "la ducha",
                "towel": "la toalla",
                "soap": "el jabón",
                "toothbrush": "el cepillo de dientes",
                "brush": "el cepillo",
                "comb": "el peine",
                "scissors": "las tijeras",
                "knife": "el cuchillo",
                "fork": "el tenedor",
                "spoon": "la cuchara",
                "plate": "el plato",
                "bowl": "el tazón",
                "glass": "el vaso",
                "napkin": "la servilleta",
                "car": "el carro",
                "house": "la casa",
                "person": "la persona",
                "man": "el hombre",
                "woman": "la mujer",
                "dog": "el perro",
                "cat": "el gato"
            };
        }
        onAwake() {
            print("TranslationManager ready with " + Object.keys(this.translations).length + " translations");
        }
        /**
         * Translate a single label if Spanish is enabled
         */
        translateLabel(englishLabel) {
            if (!this.enableSpanishTranslation) {
                return englishLabel;
            }
            const normalized = englishLabel.toLowerCase().trim();
            // Direct match
            if (this.translations[normalized]) {
                return this.translations[normalized];
            }
            // Partial match
            for (const key in this.translations) {
                if (normalized.includes(key) || key.includes(normalized)) {
                    return this.translations[key];
                }
            }
            // No translation found
            return englishLabel;
        }
        /**
         * Process all points from Gemini response
         */
        translatePoints(geminiPoints) {
            if (!this.enableSpanishTranslation) {
                return geminiPoints;
            }
            const translatedPoints = [];
            for (const point of geminiPoints) {
                const translatedPoint = {
                    ...point,
                    label: this.translateLabel(point.label),
                    originalLabel: point.label
                };
                translatedPoints.push(translatedPoint);
            }
            return translatedPoints;
        }
    };
    __setFunctionName(_classThis, "TranslationManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TranslationManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TranslationManager = _classThis;
})();
exports.TranslationManager = TranslationManager;
//# sourceMappingURL=TranslationManager.js.map