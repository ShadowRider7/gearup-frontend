import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getCategoryList } from "./_actions/getAllCategory";
import { categoryResponse, GearItems } from "@/lib/type";
import { getGearList } from "./_actions/getAllGears";
import { GearCard } from "./_components/gears/GearCard";
import {
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { getUser } from "@/service/getUser";
import Image from "next/image";

export default async function HomePage() {
  const user = await getUser();
  const categoryResponse: categoryResponse = await getCategoryList();
  const category = categoryResponse.data.categoryList || [];

  const popularCategory = category.filter((cat) => cat.gearItems.length >= 1);

  const gearResponse: GearItems = await getGearList();
  const gearItems = gearResponse.data.gearItemsList.data || [];
  const featured = gearItems.filter((gear) => gear.averageRating >= 4);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased space-y-20 pb-20">
      <div className="relative h-[65vh] min-h-112.5 overflow-hidden flex items-center justify-center text-center px-4 bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1600&h=600&fit=crop&auto=format"
          alt="Hero landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-black/40" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="h-3 w-3" /> Sports & Outdoor Rentals
          </div>
          <h1 className="font-extrabold text-4xl sm:text-6xl tracking-tight text-white uppercase leading-none">
            Gear Up.
            <br />
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Adventure Awaits.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto">
            Rent premium gear from verified providers. Pick dates, pay securely,
            and hit the trail.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Popular Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCategory.map((cat) => (
            <Link
              key={cat.id}
              href={`/gears?categoryId=${cat.id}`}
              className="group"
            >
              <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className="text-3xl h-12 w-12 flex items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    🏕️
                  </div>
                  <h3 className="font-bold tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {cat.gearItems.length} items
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Gear</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/gears">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((gear) => (
            <Link
              key={gear.id}
              href={`/gears/${gear.id}`}
              className="hover:scale-[1.01] transition-transform"
            >
              <GearCard gear={gear} />
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <CheckCircle2 />,
              title: "Quality Gear",
              desc: "Carefully maintained and inspected equipment.",
            },
            {
              icon: <DollarSign />,
              title: "Affordable Prices",
              desc: "Save up to 80% compared to buying new.",
            },
            {
              icon: <Truck />,
              title: "Easy Pickup",
              desc: "Convenient local pickup and rental windows.",
            },
            {
              icon: <ShieldCheck />,
              title: "Secure & Insured",
              desc: "All transactions and rentals are fully covered.",
            },
          ].map((item, idx) => (
            <Card key={idx} className="bg-muted/40 border-none">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-background text-primary border shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {!user && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center space-y-4 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-white">Ready to Start?</h2>
            <p className="text-sm text-primary-foreground/80 max-w-sm mx-auto">
              Join thousands of adventurers renting quality gear safely on their
              own terms.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="font-semibold shadow-sm"
            >
              <Link href="/auth/register">Sign Up Today</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
