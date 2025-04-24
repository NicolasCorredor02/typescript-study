import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "../products.api";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProductDetail({ params }: {params: {id: string}}) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <h1>Product Detail: {product._id}</h1>
          </CardTitle>
          <Link href="/" className={buttonVariants()}>
            Back
          </Link>
        </CardHeader>
        <CardContent>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Code: {product.code}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category}</p>
          <p>Thumbnails:</p>
          <ul className="flex gap-2 flex-wrap">
            {product.thumbnails.map((thumbnail) => (
              <li key={thumbnail} className="w-1/4">
                <Image
                  src={thumbnail}
                  alt={product.title}
                  width={400}
                  height={400}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
