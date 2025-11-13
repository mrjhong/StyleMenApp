import { post } from "../utils/api";
import { analyzeOutfitPhoto } from "./geminiService";

export const outfitservice = {
    generateOutfit: async (selectedStyle, selectedOccasion) => {
        // Lógica para generar outfit basado en preferencias
        const data =await post("/outfit/generate", {style: selectedStyle, occasion: selectedOccasion, } );
        return data;
    },
    analyzeOutfitPhoto: async (image, imageMediaType) => {

        const base64Image = image.replace(/^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/, '');

        const data = await post("/outfit/generate",{base64Image: base64Image,imageMediaType: imageMediaType || "image/jpeg"});
        return data;
    },  
};