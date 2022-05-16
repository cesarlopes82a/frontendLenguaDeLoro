export class Listadeprecios{
    constructor(
        public listaNombre: string,
        public descripcion: string,
        public products: string[],
        public creadapor: string,
        public fechaDeCreacion: string,
        public storeId: number
    ){}
}
