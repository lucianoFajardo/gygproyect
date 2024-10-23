const { z } = require("zod");

// TODO -> validaciones para los ingresos de datos del usuario, cuando tipea algo
const CreateClientSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    phone1: z.string().min(1, 'El telefono es obligatorio').max(9, 'Numero demasiado largo'),
    phone2: z.string().optional(),
    address: z.string().min(1, 'Dirreccion obligatoria'),
    dates: z.any().nullable().refine(value => value !== null, 'Fecha de pago obligatoria'),
    payments: z.number().refine(value => value > 0, 'Ingrese un montor de pago'),
    coordenates: z.string().min(1,'Coordenadas obligatorias (x,y)'),
    district: z.string().min(1,'Ingresar opcion'),
    observations: z.string().min(1, 'Ingresar una observacion'),
    type_payment: z.string().min(1, 'Ingresar tipo de pago'),
})

export default CreateClientSchema;

//Modelo basico de datos para validar