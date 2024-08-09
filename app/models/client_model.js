// clientModel.js (o como hayas nombrado el archivo)
export class Client {
    constructor(clientData) {
        this.name = clientData.name;
        this.phone1 = clientData.phone1;
        this.phone2 = clientData.phone2 || '';
        this.address = clientData.address;
        this.gpsLocation = clientData.gpsLocation;
        this.antennaPhotos = clientData.antennaPhotos || [];
        this.dates = Array.isArray(clientData.dates)
            ? clientData.dates.map(date => new Date(date))
            : [];
        this.payment = clientData.payment;
    }

    toObject() {
        return {
            name: this.name,
            phone1: this.phone1,
            phone2: this.phone2,
            address: this.address,
            gpsLocation: this.gpsLocation,
            antennaPhotos: this.antennaPhotos,
            dates: this.dates.map(date => date.toISOString()),
            payment: this.payment,
        };
    }
}
