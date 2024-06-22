// Values for table title
const tableTitles = {
  users: 'USUARIOS',
  warehouses: 'BODEGAS',
  products: 'PRODUCTOS',
};

// Values for user columns
const userColumns = {
  type: 'Tipo',
  company_name: 'Razón social',
  name: 'Nombres',
  last_name: 'Apellidos',
  document: 'Documento',
  nit: 'NIT',
  email: 'Correo Electrónico',
  status: 'Estado',
  email_backup: 'Correo electrónico de respaldo',
  phone: 'Teléfono',
  phone_backup: 'Teléfono de respaldo',
  ubication: 'Ubicación'
};

//Values for user creation
const userCreateFields = {
  type: {
    label:'Tipo',
    options: ['Natural', 'Jurídica'],
    required: true
  },
  company_name: {
    label: 'Razón social',
    required: true
  },
  name: {
    label: 'Nombres',
    required: true
  },
  last_name: {
    label: 'Apellidos',
    required: true
  },
  document: {
    label:'Documento',
    required: true
  },
  nit: {
    label: 'NIT',
    required: true
  },
  email: {
    label: 'Correo Electrónico',
    required: true
  },
  status: {
    label: 'Estado',
    options: ["Activo", "Inactivo"],
    required: true
  },
  email_backup: 'Correo electrónico de respaldo',
  phone: 'Teléfono',
  phone_backup: 'Teléfono de respaldo',
  ubication: 'Ubicación'
};

// Values for product columns
const productColumns = {
  sku: 'SKU',
  name: 'Nombre',
  short_description: 'Descripción corta',
  long_description: 'Descripción larga',
  measurement_unit: 'Unidad de medida',
  long: 'Largo',
  high: 'Alto',
  width: 'Ancho',
  volume: 'Volumen',
  amount: 'Monto',
  date: 'Fecha',
  status: 'Estado'
};

//Values for product creation
const productCreateFields1 = {
  sku: 'SKU',
  name: 'Nombre',
  short_description: 'Descripción corta',
  long_description: 'Descripción larga',
  measurement_unit: 'Unidad de medida',
  long: 'Largo',
  high: 'Alto',
  width: 'Ancho',
  volume: 'Volumen',
  amount: 'Monto',
  date: 'Fecha',
  status: 'Estado'
};

const productCreateFields = {
  product: {
    sku: {
      label: 'SKU',
      required: true
    },
    name: {
      label: 'Nombre',
      required: true
    },
    short_description: {
      label: 'Descripción corta',
      required: true
    },
    long_description: {
      label: 'Descripción larga',
      required: true
    },
  },
  footprint: {
    measurement_unit: {
      label: 'Unidad de medida',
      required: true,
      options: [
        'Gramo',
        'Kilogramo',
        'Tonelada',
        'Mililitro',
        'Litro',
        'Metro cúbico',
        'Metro',
        'Centímetro',
        'Metro cuadrado',
        'Palet',
        'Caja',
        'Paquete',
        'Botella',
        'Barril',
        'Contenedor'
      ],
    },
    long: {
      label: 'Largo',
      required: true
    },
    high: {
      label: 'Alto',
      required: true
    },
    width: {
      label: 'Ancho',
      required: true
    },
    weigth: {
      label: 'Peso',
      required: true
    },
    volume: {
      label: 'Volumen',
      required: true
    },
  }
};

export { tableTitles, userColumns, userCreateFields, productColumns, productCreateFields};
