export class Phone{
    constructor(public id:number, public manufacturerName:string,public model:string,public price:number,public operatingSystem:string,public size:number){}
}
export class PhoneEntity
{
    constructor(public id:number,public model:string,public price:number,public operatingSystem:string,public size:number,public manufacturerId:number){}

}