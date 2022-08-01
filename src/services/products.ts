import { http } from '../utils/http'
import { ProductType } from "../types/product";

export async function getProducts(): Promise<ProductType[]>{
  try{
    const { data } = await http.get('/products')
    return data
  }catch{
    return []
  } 
}

export async function getProductById(id: number): Promise<ProductType | null>{
  try{
    const { data } = await http.get(`/products/${id}`)
    return data
  }catch{
    return null
  } 
}
