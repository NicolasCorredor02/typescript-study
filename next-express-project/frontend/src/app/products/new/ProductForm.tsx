"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/app/products/products.api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";

export const dynamic = "force-dynamic"; // Esto hace que cada vez que se entre a la pagina se haga una peticion

export default function ProductForm({ product }: { product: Product | null }) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      code: product?.code || "",
      category: product?.category || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      thumbnails: product?.thumbnails.join("-") || "",
    },
  });
  const router = useRouter();
  const { id } = useParams<{id: string}>();

  const onSubmit = handleSubmit(async (data) => {
    const images = data.thumbnails.split("-").map((url) => url.trim());
    const productData = {
      ...data,
      thumbnails: images,
    };
    if(id) {
      await updateProduct(id, productData)
    } else {
      await createProduct(productData);
    }
    router.push("/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <Label>Name</Label>
      <Input type="text" {...register("title")} />
      <Label>Description</Label>
      <Input type="text" {...register("description")} />
      <Label>Code</Label>
      <Input type="text" {...register("code")} />
      <Label>Category</Label>
      <Controller
        name="category"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="women's clothing">
                  Womens clothing
                </SelectItem>
                <SelectItem value="men's clothing">Mens clothing</SelectItem>
                <SelectItem value="footwear">Footwear</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <Label>Price</Label>
      <Input type="" step="0.01" min="0.01" {...register("price")} />
      <Label>Stock</Label>
      <Input type="number" {...register("stock")} />
      <Label>URL(s) Image (to many images split it with (-) )</Label>
      <Input type="text" {...register("thumbnails")} />

      <Button className="cursor-pointer">{id ? "Update" : "Create"}</Button>
    </form>
  );
}
