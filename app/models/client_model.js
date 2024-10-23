// clientModel.js (o como hayas nombrado el archivo)
export class Client {
    constructor(clientData) {
        this.name = clientData.name;
        this.phone1 = clientData.phone1;
        this.phone2 = clientData.phone2 || '';
        this.address = clientData.address;
        this.dates = Array.isArray(clientData.dates)
            ? clientData.dates.map(date => new Date(date))
            : [];
        this.payments = clientData.payments;
        this.district = clientData.district;
        this.status = clientData.status;
        this.coordenates = clientData.coordenates;
        this.type_payment = clientData.type_payment;
    }

    toObject() {
        return {
            name: this.name,
            phone1: this.phone1,
            phone2: this.phone2,
            address: this.address,
            dates: this.dates.map(date => date.toISOString()),
            payments: this.payments,
            district: this.district,
            status: this.status,
            coordenates : this.coordenates,
            type_paymet : this.type_payment,
        };
    }
}
