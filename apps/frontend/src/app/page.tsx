import Link from "next/link";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-green-100 italic-none">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            FreshMarket
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/"
              className="text-sm font-medium hover:text-green-600 transition-colors"
            >
              Locations
            </Link>
            <Link
              href="/"
              className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#111] text-white p-12 md:p-24">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-400 text-xs font-bold tracking-wider uppercase mb-6">
                Now Delivering Nationwide
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                Premium groceries, <br />
                <span className="text-green-400">delivered fresh</span> <br />
                to your door.
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                Experience the finest organic produce and artisanal goods
                curated from local farmers who care about quality as much as you
                do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">
                  Browse Products
                </button>
                <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                  View Offers
                </button>
              </div>
            </div>

            {/* Abstract Design Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 rounded-full blur-[120px]"></div>
            </div>
          </div>

          {/* Trending Section */}
          <div className="mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
                <p className="text-gray-500">
                  The most popular items this week
                </p>
              </div>
              <button className="text-green-600 font-semibold hover:underline">
                View All
              </button>
            </div>

            <ProductList />
          </div>

          {/* Featured Categories */}
          <div className="mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
                <p className="text-gray-500">
                  Explore our curated selection of fresh goods
                </p>
              </div>
              <button className="text-green-600 font-semibold hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Organic Fruits",
                  count: "120+ Items",
                  color: "bg-orange-50",
                },
                {
                  name: "Fresh Vegetables",
                  count: "85+ Items",
                  color: "bg-green-50",
                },
                {
                  name: "Artisan Bakery",
                  count: "45+ Items",
                  color: "bg-yellow-50",
                },
              ].map((cat, i) => (
                <div
                  key={i}
                  className={`${cat.color} rounded-[2rem] p-10 hover:scale-[1.02] transition-transform cursor-pointer group`}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl mb-8 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow text-2xl">
                    {i === 0 ? "🍎" : i === 1 ? "🥦" : "🥖"}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-gray-500 text-sm">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            FreshMarket
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 FreshMarket Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-black transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-black transition-colors"
            >
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
