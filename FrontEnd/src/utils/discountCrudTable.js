import { readonly } from "vue";

// Values for title table
const tableTitles = {
    discounts: 'DESCUENTOS',
};

// Values for product columns
const discountColumns = {
    discount_id: 'ID',
    date: 'Fecha',
    amount: 'Monto',
    status: 'Estado'
};

//Values for warehouse creation
const discountCreateFields = {
    date: {
        label: 'Fecha',
        required: true,
        readonly: false,
    },
    amount: {
        label: 'Monto',
        required: true,
        readonly: false,
    },
    status: {
        label: 'Estado',
        required: true,
        readonly: false,
    },
}

export { tableTitles, discountColumns, discountCreateFields}