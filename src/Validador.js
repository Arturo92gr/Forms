import { InputMapper } from "./mapper/InputMapper.js"
import { Config } from "./config/Config.js"

export class Validador {
    constructor() {
        [...document.forms].forEach((form) => {
            InputMapper(form.elements).forEach((item) => {
                this.#addEvents(item);        
            });   
        })
    }

    #addEvents({type, object: input}) {
        const validator = Config.validators[type];
        
        input.addEventListener('keydown', (event) => {
            if (!validator.isValidKey(event)) {
                event.preventDefault();
                event.target.setCustomValidity(validator.errorMessage);
                event.target.reportValidity();
            } else {
                event.target.setCustomValidity('');
                event.target.reportValidity();
            }
        });

        input.addEventListener('input', (e) => {
            e.target.value = validator.formatValue(e.target.value);
        });
    }
}