const { z } = require("zod");

// TODO -> validaciones para los ingresos de datos del usuario, cuando tipea algo
const CreateClientSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    phone1: z.string().min(1, 'El telefono es obligatorio').max(9, 'Numero demasiado largo'),
    phone2: z.string().optional(),
    address: z.string().min(1, 'Dirreccion obligatoria'),
    dates: z.any().nullable().refine(value => value !== null, 'Fecha de pago obligatoria'),
    payment: z.number().refine(value => value > 0, 'Ingrese un montor de pago'),
    antennaPhotos: z.array(z.any()).optional()
})

export default CreateClientSchema;

//Modelo basico de datos para validar