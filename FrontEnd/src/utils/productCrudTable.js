import { readonly } from "vue";

// Values for title table
const tableTitles = {
    products: 'PRODUCTOS',
};

// Values for product columns
const productColumns = {
    product_id: 'ID',
    sku: 'SKU',
    name: 'Nombre',
    short_description: 'Descripción corta',
    long_description: 'Descripción larga',
    footprint: 'Huella',
    price: 'Precio',
    discount: 'Descuento',
    tax: 'Impuestos'
};

//Values for warehouse creation
const productCreateFields = {
    name: {
        label: 'Nombre',
        required: true,
        readonly: false,
        maxLength: 100
    },
    short_description: {
        label: 'Descripción corta',
        required: true,
        readonly: false,
        maxLength: 30
    },
    long_description: {
        label: 'Descripción larga',
        required: true,
        readonly: false,
        maxLength: 100
    },
    footprint: {
        label: 'Huella',
        required: true,
        readonly: false,
    },
    price: {
        label: 'Precio',
        required: true,
        readonly: false,
    },
    discount: {
        label: 'Descuento',
        required: true,
        readonly: false,
    },
    tax: {
        label: 'Impuesto',
        required: true,
        readonly: false,
    },
}

export { tableTitles, productColumns, productCreateFields}