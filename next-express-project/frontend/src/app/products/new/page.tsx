import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "@/app/products/new/ProductForm";

export default function ProductsNewPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm/>
        </CardContent>
      </Card>
    </div>
  );
}
