export interface InputCreateProductDto {
    id: string,
    type:string,
    name: string,
    price: number
}

export interface OutputCreateProductDto {
    id: string,
    name: string,
    type: string,
    price: number
}