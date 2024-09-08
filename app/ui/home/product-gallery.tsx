import ProductsList from "@/app/ui/products/products-list"
import CustomLink from "../common/custom-link"
import { fetchProductsAPI } from "@/app/lib/services/products/productService"
import { ProductsListSkeleton } from "../skeletons/products-skeleton"
import Heading from "../common/heading"
import { ROUTES } from "@/app/lib/constants/routes"

export default async function ProductGallery({
    title,
    tag,
}: {
    title: string
    tag: string
}) {
  const products = await fetchProductsAPI()

    return (
        <div className="mt-20">
            <div className="w-5/6 mx-auto text-center">
              <Heading level={2} className="text-center text-[#5D2A1E]">{title}</Heading>
            </div>
            <ProductsList 
              products={products} 
              tag={tag} 
              limit={100}
              startIndex={0}
              endIndex={2}
              className="md:grid-cols-3"
            />
            <br />
            <br />
            <ProductsList 
              products={products} 
              tag={tag} 
              limit={100}
              startIndex={3}
              endIndex={4}
              className="md:grid-cols-2 w-1/2 md:w-1/3"
            />
        </div>
    )
}