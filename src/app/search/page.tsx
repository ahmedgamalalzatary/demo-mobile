import { products } from "@/lib/data";
import { BottomNav, TopBar } from "@/components/ui";
import { FilterableList } from "@/components/FilterableList";

export default function SearchPage() {
  return (
    <main>
      <TopBar title="البحث" />
      <FilterableList items={products} placeholder="ابحث عن منتج، علامة تجارية..." autoFocus />
      <BottomNav />
    </main>
  );
}
