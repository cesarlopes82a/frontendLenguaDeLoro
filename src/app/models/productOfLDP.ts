export class productOfLDP{
        
    constructor(
        public _id: string,
        public productName: string,
        public rubro: string,
        public codigo: string,
        public stock: number,
        public fechaUltimaCompra:string,
        public costoUnitario: number,
        public precioVenta: number,
        public desactivado: boolean
        
    ){}
}


