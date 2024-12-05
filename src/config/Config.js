export const Config = {
    classTypes: {
        "euro": "euro",
        "date": "date"
    },
    patterns: {
        euro: /^\d+([.,]\d{0,2})?€?$/,
        date: /^(\d{2}\/){2}\d{4}$/
    },
    validators: {
        euro: {
            isValidKey: (event) => {
                const validKeys = /^\d$|^\.$|Backspace|ArrowLeft|ArrowRight|Delete|Tab/;
                const value = event.target.value;
                
                // Permitir solo un punto decimal
                if (event.key === '.' && value.includes('.')) {
                    return false;
                }
                
                // Permitir solo dos decimales después del punto
                if (value.includes('.')) {
                    const decimals = value.split('.')[2];
                    if (decimals?.length >= 2 && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(event.key)) {
                        return false;
                    }
                }
                
                return validKeys.test(event.key);
            },
            formatValue: (value) => {
                const cleaned = value.replace(/[^\d.]/g, '');
                if (!cleaned) return '';

                const parts = cleaned.split('.');
                const wholePart = parts[0];
                const decimalPart = parts[1] || '';

                if (decimalPart) {
                    return `${wholePart}.${decimalPart.slice(0, 2)}€`;
                }
                
                return `${wholePart}${parts.length > 1 ? '.' : ''}${decimalPart}€`;
            },
            errorMessage: 'Solo se permiten números y "."'
        },
        date: {
            isValidKey: (event) => {
                const validKeys = /^\d$|Backspace|ArrowLeft|ArrowRight|Delete|Tab/;
                const value = event.target.value.replace(/\D/g, '');
                
                // No permitir más de 8 dígitos (DDMMYYYY)
                if (value.length >= 8 && validKeys.test(event.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(event.key)) {
                    return false;
                }
                
                return validKeys.test(event.key);
            },
            formatValue: (value) => {
                const cleaned = value.replace(/\D/g, '').slice(0, 8);
                return cleaned
                    .replace(/(\d{2})(\d)/, '$1/$2')
                    .replace(/(\d{2})(\d)/, '$1/$2');
            },
            errorMessage: 'Solo se permiten números (DD/MM/YYYY)'
        }
    }
}