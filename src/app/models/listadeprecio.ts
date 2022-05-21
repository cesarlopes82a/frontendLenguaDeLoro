import { productOfLDP } from "./productOfLDP";

export class Listadeprecios{
    constructor(
        public listaNombre: string,
        public descripcion: string,
        public products: productOfLDP[],
        public creadapor: string,
        public fechaDeCreacion: string,
        public storeId: string
    ){}
}
