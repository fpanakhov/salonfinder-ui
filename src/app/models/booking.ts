
export class Booking{
    salonId: string;
    date: Date;
    fromHour: number;
    email: string;
    services: string[];
    confirmCode: string;
    confirmed: Boolean;
    cancelCode: string;
    cancelled: Boolean;
    
    constructor(){
	}
}
