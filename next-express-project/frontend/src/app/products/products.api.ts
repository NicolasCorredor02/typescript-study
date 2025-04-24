import { Product } from "@/types/product";

export async function createProduct(productData:Omit<Product, "_id" | "status"> ): Promise<void> {
  const response = await fetch("http://localhost:8080/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  
  const newProduct = await response.json();
  
  console.log(newProduct);
  // return newProduct
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:8080/api", {
    cache: "no-store", // Esto hace que cada vez que se entre a la pagina se haga una peticion
  })
  
    if (!response.ok) {
        throw new Error("Failed to fetching products")
    }

    const { data } = await response.json()

    return data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`http://localhost:8080/api/${id}`, {
    cache: "no-store", // Esto hace que cada vez que se entre a la pagina se haga una peticion
  })
  
    if (!response.ok) {
        throw new Error("Failed to fetching products")
    }

    const { data } = await response.json()

    return data
}

export async function deleteProduct(id: string): Promise<Product> {
  const response = await fetch(`http://localhost:8080/api/${id}`, {
    method: "DELETE",
  })

  if(!response.ok) {
    throw new Error("Failed to delelte product")
  }

  return await response.json()
}
