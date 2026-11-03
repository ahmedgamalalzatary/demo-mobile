import { notFound } from "next/navigation";
import { categories, getCategory, products } from "@/lib/data";
import { BottomNav, TopBar } from "@/components/ui";
import { FilterableList } from "@/components/FilterableList";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  // Cosmetics shows the whole beauty shelf, like the mockup
  const items = slug === "cosmetics" ? products.filter((p) => ["cosmetics", "skincare", "body", "haircare"].includes(p.category)) : products.filter((p) => p.category === slug);
  const chips = slug === "cosmetics" ? ["بشرة", "شعر", "مكياج", "عناية بالجسم"] : [...new Set(items.map((p) => p.tag))];

  return (
    <main>
      <TopBar title={cat.name} />
      <FilterableList items={items} chips={chips.length > 1 ? chips : undefined} placeholder={`ابحث في ${cat.name}...`} />
      <BottomNav />
    </main>
  );
}
