import { Product } from "@/types/product";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function createProduct(productData:Omit<Product, "_id" | "status"> ): Promise<void> {
  const response = await fetch(`${BACKEND_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BACKEND_URL}`, {
    cache: "no-store", // Esto hace que cada vez que se entre a la pagina se haga una peticion
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetching products")
  }
  
  const { data } = await response.json()
  
  return data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BACKEND_URL}/${id}`, {
    cache: "no-store", // Esto hace que cada vez que se entre a la pagina se haga una peticion
  })
  
  if (!response.ok) {
    throw new Error("Failed to fetching product")
  }
  
  const { data } = await response.json()
  
  return data
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(productData)
  })
  
  if(!response.ok) {
    throw new Error("Error updating product");
  }
}

export async function deleteProduct(id: string): Promise<Product> {
  const response = await fetch(`${BACKEND_URL}/${id}`, {
    method: "DELETE",
  })

  if(!response.ok) {
    throw new Error("Failed to delelte product")
  }

  return await response.json()
}
