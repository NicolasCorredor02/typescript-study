"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteProduct } from "@/app/products/products.api";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  async function handleDeleteProduct(id: string) {
    await deleteProduct(id);
    router.refresh();
  }

  return (
    <Card
      onClick={() => {
        router.push(`/products/${product._id}`);
      }}
      className="flex flex-col justify-between cursor-pointer"
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl">{product.title}</CardTitle>
        <Label className={buttonVariants({ variant: "default" })}>
          $ {product.price}
        </Label>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Image
          className="place-self-center col-span-2"
          src={product.thumbnails[0]}
          alt={product.title}
          width={200}
          height={200}
        />
        <Label className="col-span-2">{product.description}</Label>
        <Label className={buttonVariants({ variant: "secondary" })}>
          Code: {product.code}
        </Label>
        <Label className={buttonVariants({ variant: "secondary" })}>
          {product.category}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Evita que se dispare el evento del Card que direcciona a la pagina de detalle
            router.push(`/products/${product._id}/edit`);
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="lg"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProduct(product._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
