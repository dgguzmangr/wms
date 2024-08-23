import { readonly } from "vue";

// Values for title table
const tableTitles = {
    prices: 'PRECIOS',
};

// Values for price columns
const priceColumns = {
    price_id: 'ID',
    amount: 'Monto',
    date: 'Fecha',
    status: 'Estado'
};

//Values for price creation
const priceCreateFields = {
    amount: {
        label: 'Monto',
        required: true,
        readonly: false,
    },
    date: {
        label: 'Fecha',
        required: true,
        readonly: false,
    },
    status: {
        label: 'Estado',
        required: true,
        readonly: false,
    }
}

export { tableTitles, priceColumns, priceCreateFields }