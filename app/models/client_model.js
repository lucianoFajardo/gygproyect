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
    }

    toObject() {
        return {
            name: this.name,
            phone1: this.phone1,
            phone2: this.phone2,
            address: this.address,
            dates: this.dates.map(date => date.toISOString()),
            payments: this.payments,
        };
    }
}
