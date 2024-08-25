import { readonly } from "vue";

// Values for title table
const tableTitles = {
    locations: 'UBICACIONES',
};

// Values for location columns
const locationColumns = {
    location_id: 'ID',
    type: 'Tipo',
    long: 'Largo',
    high: 'Alto',
    width: 'Ancho',
    weight: 'Peso',
    volume: 'Volumen',
    description: 'Descripción',
};

//Values for location creation
const locationCreateFields = {
    type: {
        label: 'Tipo',
        required: true,
        readonly: false
    },
    long: {
        label: 'Largo',
        required: true,
        readonly: false
    },
    high: {
        label: 'Alto',
        required: true,
        readonly: false
    },
    width: {
        label: 'Ancho',
        required: true,
        readonly: false
    },
    weight: {
        label: 'Peso',
        required: true,
        readonly: false
    },
    volume: {
        label: 'Peso',
        required: true,
        readonly: false
    },
    description: {
        label: 'Descripción',
        required: true,
        readonly: false,
        maxLength: 250
    },
}

export { tableTitles, locationColumns, locationCreateFields }