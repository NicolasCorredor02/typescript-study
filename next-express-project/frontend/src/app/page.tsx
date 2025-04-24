import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "./products/products.api";
import ProductCard from "@/components/ui/ProductCard";

export default async function Home() {
  const products = await getProducts();


  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Next Express App</h1>
        <Link href="/products/new" className={buttonVariants()}>
          Create product
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {products.map(
          (product) => (<ProductCard key={product._id} product={product}/>)
        )}
      </div>
    </>
  );
}
