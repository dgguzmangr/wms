import { readonly } from "vue";

// Values for title table
const tableTitles = {
    taxes: 'IMPUESTOS',
};

// Values for tax columns
const taxColumns = {
    tax_id: 'ID',
    name: 'Nombre',
    percentage: 'Porcentaje',
    status: 'Estado'
};

//Values for tax creation
const taxCreateFields = {
    name: {
        label: 'Nombre',
        required: true,
        readonly: false,
        maxLength: 100
    },
    percentage: {
        label: 'Porcentaje',
        required: true,
        readonly: false
    },
    status: {
        label: 'Estado',
        required: true,
        readonly: false
    }
}

export { tableTitles, taxColumns, taxCreateFields }