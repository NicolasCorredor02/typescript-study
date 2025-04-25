import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "../products.api";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProductDetail({ params }: {params: {id: string}}) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <h1>Product Detail: {product._id}</h1>
          </CardTitle>
          <Link href="/" className={buttonVariants()}>
            Back
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          <ul className="flex gap-2 flex-wrap col-span-3 border-2 p-2">
            {product.thumbnails.map((thumbnail, index) => (
              <li key={index} className="w-1/4">
                <Image
                  src={thumbnail}
                  alt={product.title}
                  width={400}
                  height={400}
                />
              </li>
            ))}
          </ul>
          <h2 className="col-span-3 text-xl font-bold">{product.title}</h2>
          <p className="col-span-3">{product.description}</p>
          <p className={`${buttonVariants({ size: "sm", variant: "outline" })} col-span-1`}>{product.code}</p>
          <p className={`${buttonVariants({size: "sm", variant:"outline"})} col-span-1`}>Stock: {product.stock}</p>
          <p className={`${buttonVariants({size: "sm", variant:"outline"})} col-span-1`}>{product.category}</p>
          <p className={`${buttonVariants({size: "lg"})}`}>${product.price}</p>
        </CardContent>
      </Card>
    </div>
  );
}
