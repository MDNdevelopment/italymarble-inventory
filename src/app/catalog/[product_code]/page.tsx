import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  fetchSlabByProductCode,
  fetchSimilarSlabs,
} from "@/utils/supabaseServerQueries";
import Breadcrumb from "@/components/slab-detail/Breadcrumb";
import SlabHero from "@/components/slab-detail/SlabHero";
import SlabImage from "@/components/slab-detail/SlabImage";
import SlabSpecifications from "@/components/slab-detail/SlabSpecifications";
import SlabActions from "@/components/slab-detail/SlabActions";
import SimilarSlabs from "@/components/slab-detail/SimilarSlabs";

interface PageProps {
  params: Promise<{ product_code: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { product_code } = await params;
  const slab = await fetchSlabByProductCode(product_code);

  if (!slab) return { title: "Slab Not Found" };

  return {
    title: `${slab.product_code} — ${slab.material_index}`,
    description: `${slab.material_index} ${slab.surface_index} stone slab. ${slab.length}×${slab.width}cm, ${slab.thickness}mm.`,
  };
}

export default async function SlabDetailPage({ params }: PageProps) {
  const { product_code } = await params;

  const slab = await fetchSlabByProductCode(product_code);
  if (!slab) notFound();

  const similarSlabs = await fetchSimilarSlabs(slab.material_index, slab.id, 3);

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen max-w-360 mx-auto">
      {/* Breadcrumb + Hero */}
      <section className="px-6 md:px-12  mx-auto">
        <Breadcrumb productCode={slab.product_code} />
        <SlabHero slab={slab} />
      </section>

      {/* Product Content */}
      <section className="px-6 md:px-12  mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Image — 8 cols */}
          <div className="lg:col-span-8">
            <SlabImage src={slab.picture_ref} alt={slab.product_code} />
          </div>

          {/* Specs + Actions — 4 cols sticky */}
          <div className="lg:col-span-4  self-start">
            <SlabSpecifications slab={slab} />
            <SlabActions slab={slab} />
            <p className="mt-6 px-10 text-[10px] leading-relaxed text-onsurface-variant">
              Prices are indicative and subject to change. Contact us for a
              confirmed quote. All dimensions are approximate and may vary
              slightly.
            </p>
          </div>
        </div>
      </section>

      {/* Similar Stones */}
      <SimilarSlabs slabs={similarSlabs} />
    </main>
  );
}
