import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "@/app/products/new/ProductForm";
import { getProductById } from "../products.api";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProductsNewPage({
  params,
}: {
  params: { id?: string };
}) {
  const { id } = await params;
  let product = null;
  if (id) {
    try {
      product = await getProductById(id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{id ? "Update Product" : "Create Product"}</CardTitle>
          <Link href="/" className={buttonVariants()}>
            Back
          </Link>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
