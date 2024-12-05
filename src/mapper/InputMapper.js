import { Config } from "../config/Config.js"

export const InputMapper = (inputs) => {
    return [...inputs].map( item => {
        for (let classItem in Config.classTypes) {
            if (item.classList.contains(classItem)) return {
                "type" : classItem,
                "object": item
            }
        }
        return null;
    }).filter(item => item !== null);
}