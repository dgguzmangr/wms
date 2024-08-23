import { readonly } from "vue";

// Values for title table
const tableTitles = {
    footprints: 'HUELLAS',
};

// Values for warehouse columns
const footprintColumns = {
    measurement_unit_id: 'ID',
    measurement_unit: 'Unidad de medida',
    long: 'largo',
    high: 'Alto',
    width: 'Ancho',
    weight: 'Peso',
    volume: 'Volumen'
};

//Values for warehouse creation
const footprintCreateFields = {
    measurement_unit: {
        label: 'Unidad de medida',
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
        label: 'Volumen',
        required: true,
        readonly: false
    },
}

export { tableTitles, footprintColumns, footprintCreateFields }