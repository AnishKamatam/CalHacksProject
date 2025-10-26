/**
 * Translates detected objects to Spanish
 * Works with the existing GeminiAPI and Labels system
 */
@component
export class SpanishTranslator extends BaseScriptComponent {
    // Spanish translations
    private translations: { [key: string]: string } = {
        // Common objects
        "hat": "el sombrero",
        "bottle": "la botella",
        "water bottle": "la botella de agua",
        "phone": "el teléfono",
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
        "napkin": "la servilleta"
    };

    onAwake() {
        print("✅ SpanishTranslator: Ready with " + Object.keys(this.translations).length + " translations");
    }

    /**
     * Translate English object name to Spanish
     */
    public translate(englishWord: string): string {
        const normalized = englishWord.toLowerCase().trim();
        
        // Direct match
        if (this.translations[normalized]) {
            return this.translations[normalized];
        }

        // Try to find partial match
        for (const key in this.translations) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return this.translations[key];
            }
        }

        // No translation found, return original with note
        return englishWord + " (?)";
    }

    /**
     * Translate an array of labels
     */
    public translateLabels(labels: any[]): any[] {
        const translated = [];
        
        for (const label of labels) {
            const spanishLabel = {
                ...label,
                label: this.translate(label.label),
                originalLabel: label.label // Keep original for reference
            };
            translated.push(spanishLabel);
        }

        return translated;
    }

    /**
     * Get all available translations
     */
    public getTranslations(): { [key: string]: string } {
        return this.translations;
    }
}
