import { readonly } from "vue";

// Values for title table
const tableTitles = {
    buildings: 'EDIFICIO',
};

// Values for building columns
const buildingColumns = {
    building_id: 'ID',
    name: 'Nombre',
    location: 'Ubicaciones'
};

//Values for building creation
const buildingCreateFields = {
    name: {
        label: 'Nombre',
        required: true,
        readonly: false,
        maxLength: 100
    },
    location: {
        label: 'Ubicaciones',
        required: true,
        readonly: false,
    }
}

export { tableTitles, buildingColumns, buildingCreateFields }