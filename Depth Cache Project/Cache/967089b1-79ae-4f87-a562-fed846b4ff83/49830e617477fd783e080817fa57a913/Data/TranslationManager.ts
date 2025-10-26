/**
 * Standalone translation manager that handles Spanish translations
 * Works independently without modifying existing components
 */
@component
export class TranslationManager extends BaseScriptComponent {
    @input enableSpanishTranslation: boolean = false;
    
    private translations: { [key: string]: string } = {
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

    onAwake() {
        print("TranslationManager ready with " + Object.keys(this.translations).length + " translations");
    }

    /**
     * Translate a single label if Spanish is enabled
     */
    public translateLabel(englishLabel: string): string {
        if (!this.enableSpanishTranslation) {
            return englishLabel;
        }

        const normalized = englishLabel.toLowerCase().trim();
        
        // Direct match
        if (this.translations[normalized]) {
            return englishLabel + " → " + this.translations[normalized];
        }

        // Partial match
        for (const key in this.translations) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return englishLabel + " → " + this.translations[key];
            }
        }

        // No translation found - show English only
        return englishLabel;
    }

    /**
     * Process all points from Gemini response
     */
    public translatePoints(geminiPoints: any[]): any[] {
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
}