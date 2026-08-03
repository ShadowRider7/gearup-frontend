import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getCategoryList } from "./_actions/getAllCategory";
import { Category, categoryResponse, GearItems } from "@/lib/type";
import { getGearList } from "./_actions/getAllGears";
import { GearCard } from "./_components/GearCard";

export default async function HomePage() {
  const categoryResponse: categoryResponse = await getCategoryList();
  const category = categoryResponse.data.categoryList || [];

  const popularCategory = category.filter((cat) => cat.gearItems.length >= 1);

  const gearResponse: GearItems = await getGearList();
  const gearItems = gearResponse.data.gearItemsList.data || [];
  const featured = gearItems.filter((gear) => gear.averageRating >= 4);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-72 md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1600&h=600&fit=crop&auto=format"
          alt="Adventure landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="text-xs font-mono text-primary uppercase tracking-[0.35em] mb-4">
            Sports &amp; Outdoor Equipment Rental
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl md:text-7xl uppercase text-white tracking-tight leading-[0.9] mb-5">
            Gear Up.
            <br />
            <span className="text-primary">Adventure Awaits.</span>
          </h1>
          <p className="text-sm text-white/60 max-w-sm">
            Rent premium gear from verified providers. Pick dates, pay securely,
            and go.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCategory.map((cat) => (
            <Link key={cat.name} href={`/gears?categoryId=${cat.id}`}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-3">{cat.name}</div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {cat.gearItems.length} items
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Gear Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Featured Gear</h2>
          <Link href="/gears">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((gear) => (
            <Link key={gear.id} href={`/gears/${gear.id}`}>
              <GearCard gear={gear} />
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose GearUp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Quality Gear
              </h3>
              <p className="text-slate-600">
                All equipment is carefully maintained and regularly inspected
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Affordable Prices
              </h3>
              <p className="text-slate-600">
                Save up to 80% compared to purchasing your own equipment
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-slate-900 mb-2">Easy Pickup</h3>
              <p className="text-slate-600">
                Convenient pickup locations and flexible rental periods
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Secure & Insured
              </h3>
              <p className="text-slate-600">
                All rentals are fully insured for your peace of mind
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Join thousands of satisfied customers renting quality gear
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary">
              Sign Up Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
