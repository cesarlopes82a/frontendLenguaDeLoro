export class Compra{
    constructor(
        public productId: string,
        public userId: string,
        public proveedorId: string,
        public branchId: string,
        public cantidad:number,
        public precioCompraUnitario:number,
        public fechaCompra: String,
        public fechaVencimiento: String,
        public comentario: string,
    ){}
}