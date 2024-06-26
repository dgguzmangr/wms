import { readonly } from "vue";

// Values for title table
const tableTitles = {
    warehouses: 'BODEGAS'
};

// Values for warehouse columns
const warehouseColumns = {
    warehouse_id: 'ID',
    name: 'Nombre',
    country: 'País',
    department: 'Departamento',
    city: 'Ciudad',
    neighborthood: 'Barrio',
    address: 'Dirección',
    postal_code: 'Código postal',
    location: 'Ubicación',
    building: 'Edificios'
};

//Values for warehouse creation
const warehouseCreateFields = {
    name: {
        label: 'Nombre',
        required: true,
        readonly: false,
        maxLength: 100
    },
    country: {
        label: 'País',
        required: true,
        readonly: false,
        maxLength: 100
    },
    department: {
        label: 'Departamento',
        required: true,
        readonly: false,
        maxLength: 100
    },
    neighborthood: {
        label: 'Barrio',
        required: true,
        readonly: false,
        maxLength: 100
    },
    address: {
        label: 'Dirección',
        required: true,
        readonly: false,
        maxLength: 200
    },
    postal_code: {
        label: 'Código postal',
        required: true,
        readonly: false,
        maxLength: 100
    },
}

export { tableTitles, warehouseColumns, warehouseCreateFields }