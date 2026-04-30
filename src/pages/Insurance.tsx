import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Search, ExternalLink, Phone, CheckCircle2, Globe } from "lucide-react";

type Plan = {
  planName: string;
  coverage: string;
  startingPrice: string;
  bestFor: string;
  link: string;
};

type Brand = {
  name: string;
  type: "Health" | "Life" | "General" | "Multi";
  country: string;
  highlights: string[];
  website: string;
  helpline?: string;
  cashless?: boolean;
  plans: Plan[];
};

const BRANDS: Brand[] = [
  {
    name: "Star Health Insurance", type: "Health", country: "India",
    highlights: ["14,000+ network hospitals", "Cashless claims", "No claim bonus"],
    website: "https://www.starhealth.in", helpline: "1800-425-2255", cashless: true,
    plans: [
      { planName: "Family Health Optima", coverage: "₹3L – ₹25L", startingPrice: "₹6,500/yr", bestFor: "Family floater (2A+1C)", link: "https://www.starhealth.in/health-insurance/family-health-optima-insurance-plan" },
      { planName: "Senior Citizens Red Carpet", coverage: "₹1L – ₹25L", startingPrice: "₹14,000/yr", bestFor: "Age 60-75, no medical test", link: "https://www.starhealth.in/health-insurance/senior-citizens-red-carpet-health-insurance-policy" },
      { planName: "Star Comprehensive", coverage: "₹5L – ₹1Cr", startingPrice: "₹8,200/yr", bestFor: "Premium individual cover", link: "https://www.starhealth.in/health-insurance/star-comprehensive-insurance-policy" },
    ],
  },
  {
    name: "HDFC ERGO Health", type: "Health", country: "India",
    highlights: ["10,000+ hospitals", "Critical illness cover", "Wellness rewards"],
    website: "https://www.hdfcergo.com", helpline: "022-6234-6234", cashless: true,
    plans: [
      { planName: "Optima Secure", coverage: "₹5L – ₹2Cr", startingPrice: "₹7,800/yr", bestFor: "2x cover from day 1", link: "https://www.hdfcergo.com/health-insurance/my-health-suraksha" },
      { planName: "my:health Suraksha Gold", coverage: "₹3L – ₹50L", startingPrice: "₹6,200/yr", bestFor: "Comprehensive family", link: "https://www.hdfcergo.com/health-insurance/my-health-suraksha" },
    ],
  },
  {
    name: "ICICI Lombard Health", type: "Health", country: "India",
    highlights: ["6,500+ hospitals", "OPD cover", "Quick claims"],
    website: "https://www.icicilombard.com", helpline: "1800-2666", cashless: true,
    plans: [
      { planName: "Complete Health Insurance", coverage: "₹3L – ₹50L", startingPrice: "₹5,900/yr", bestFor: "Family + OPD cover", link: "https://www.icicilombard.com/health-insurance/complete-health-insurance" },
      { planName: "Health AdvantEdge", coverage: "₹5L – ₹2Cr", startingPrice: "₹8,500/yr", bestFor: "High sum insured", link: "https://www.icicilombard.com/health-insurance" },
    ],
  },
  {
    name: "Niva Bupa", type: "Health", country: "India",
    highlights: ["10,000+ hospitals", "International cover", "Reload of sum insured"],
    website: "https://www.nivabupa.com", helpline: "1860-500-8888", cashless: true,
    plans: [
      { planName: "ReAssure 2.0", coverage: "₹5L – ₹1Cr", startingPrice: "₹7,200/yr", bestFor: "Unlimited reload of cover", link: "https://www.nivabupa.com/health-insurance-plans/reassure-health-insurance.html" },
      { planName: "Health Companion", coverage: "₹2L – ₹1Cr", startingPrice: "₹5,400/yr", bestFor: "Day-1 maternity option", link: "https://www.nivabupa.com/health-insurance-plans/health-companion.html" },
    ],
  },
  {
    name: "Care Health Insurance", type: "Health", country: "India",
    highlights: ["19,000+ hospitals", "Maternity cover", "Annual checkups"],
    website: "https://www.careinsurance.com", helpline: "1800-102-4488", cashless: true,
    plans: [
      { planName: "Care Supreme", coverage: "₹7L – ₹1Cr", startingPrice: "₹9,100/yr", bestFor: "Premium, no co-pay", link: "https://www.careinsurance.com/health-insurance-plans/care-supreme-health-insurance.html" },
      { planName: "Care Plan", coverage: "₹3L – ₹75L", startingPrice: "₹5,800/yr", bestFor: "Family floater value", link: "https://www.careinsurance.com/health-insurance-plans/care-health-insurance.html" },
    ],
  },
  {
    name: "Tata AIG MediCare", type: "Health", country: "India",
    highlights: ["7,200+ hospitals", "Global coverage", "Wellness benefits"],
    website: "https://www.tataaig.com", helpline: "1800-266-7780", cashless: true,
    plans: [
      { planName: "MediCare Premier", coverage: "₹5L – ₹1Cr", startingPrice: "₹8,400/yr", bestFor: "Worldwide cover", link: "https://www.tataaig.com/health-insurance/medicare-premier" },
      { planName: "MediCare Plus", coverage: "₹5L – ₹20L", startingPrice: "₹6,000/yr", bestFor: "Mid-tier family", link: "https://www.tataaig.com/health-insurance" },
    ],
  },
  {
    name: "Bajaj Allianz Health", type: "Health", country: "India",
    highlights: ["8,500+ hospitals", "AYUSH cover", "Co-pay options"],
    website: "https://www.bajajallianz.com", helpline: "1800-209-5858", cashless: true,
    plans: [
      { planName: "Health Guard", coverage: "₹1.5L – ₹50L", startingPrice: "₹4,800/yr", bestFor: "Affordable family", link: "https://www.bajajallianz.com/health-insurance-plans/health-guard-policy.html" },
      { planName: "Health Infinity", coverage: "₹50L+ (no upper cap)", startingPrice: "₹12,000/yr", bestFor: "Unlimited cover", link: "https://www.bajajallianz.com/health-insurance-plans.html" },
    ],
  },
  {
    name: "Aditya Birla Activ Health", type: "Health", country: "India",
    highlights: ["HealthReturns™", "Chronic care", "Daycare procedures"],
    website: "https://www.adityabirlacapital.com/healthinsurance", helpline: "1800-270-7000", cashless: true,
    plans: [
      { planName: "Activ Health Platinum Enhanced", coverage: "₹2L – ₹2Cr", startingPrice: "₹6,800/yr", bestFor: "Wellness rewards", link: "https://www.adityabirlacapital.com/healthinsurance/activ-health-insurance" },
      { planName: "Activ Care", coverage: "₹3L – ₹25L", startingPrice: "₹15,000/yr", bestFor: "Senior citizens 55+", link: "https://www.adityabirlacapital.com/healthinsurance" },
    ],
  },
  {
    name: "New India Assurance", type: "General", country: "India",
    highlights: ["Govt-backed", "Mediclaim", "Family floater"],
    website: "https://www.newindia.co.in", helpline: "1800-209-1415", cashless: true,
    plans: [
      { planName: "Mediclaim Policy", coverage: "₹1L – ₹15L", startingPrice: "₹3,500/yr", bestFor: "Govt-backed basic cover", link: "https://www.newindia.co.in" },
      { planName: "Floater Mediclaim", coverage: "₹2L – ₹8L", startingPrice: "₹5,200/yr", bestFor: "Family of 4", link: "https://www.newindia.co.in" },
    ],
  },
  {
    name: "LIC of India", type: "Life", country: "India",
    highlights: ["Largest life insurer", "Health riders", "Term plans"],
    website: "https://licindia.in", helpline: "022-6827-6827",
    plans: [
      { planName: "LIC Tech Term", coverage: "₹50L – ₹5Cr", startingPrice: "₹6,500/yr (₹1Cr, age 30)", bestFor: "Pure term life", link: "https://licindia.in/Products/Insurance-Plan/LIC-s-Tech-Term" },
      { planName: "Jeevan Arogya", coverage: "Daily hospital cash", startingPrice: "₹4,000/yr", bestFor: "Hospital cash benefit", link: "https://licindia.in" },
    ],
  },
  {
    name: "Cigna Global", type: "Health", country: "Global",
    highlights: ["Worldwide cover", "Expat focused", "Direct billing"],
    website: "https://www.cignaglobal.com", cashless: true,
    plans: [
      { planName: "Silver Plan", coverage: "$1M annual limit", startingPrice: "$2,400/yr", bestFor: "Expats — basic global", link: "https://www.cignaglobal.com/plans" },
      { planName: "Platinum Plan", coverage: "Unlimited annual", startingPrice: "$5,800/yr", bestFor: "Comprehensive worldwide", link: "https://www.cignaglobal.com/plans" },
    ],
  },
  {
    name: "Allianz Care", type: "Health", country: "Global",
    highlights: ["180+ countries", "24/7 support", "Telehealth"],
    website: "https://www.allianzcare.com", cashless: true,
    plans: [
      { planName: "MyHealth Core", coverage: "$1.2M annual", startingPrice: "$2,100/yr", bestFor: "Inpatient essentials", link: "https://www.allianzcare.com/en/individuals/our-plans/myhealth.html" },
      { planName: "MyHealth Premium", coverage: "$3M annual", startingPrice: "$5,400/yr", bestFor: "Full outpatient + dental", link: "https://www.allianzcare.com/en/individuals/our-plans/myhealth.html" },
    ],
  },
  {
    name: "Bupa Global", type: "Health", country: "Global",
    highlights: ["190+ countries", "Specialist care", "Cancer cover"],
    website: "https://www.bupaglobal.com", cashless: true,
    plans: [
      { planName: "Major Care", coverage: "£800K annual", startingPrice: "£2,200/yr", bestFor: "Hospitalization focused", link: "https://www.bupaglobal.com/en/individuals/our-plans" },
      { planName: "Premier Care", coverage: "£3M annual", startingPrice: "£5,800/yr", bestFor: "Full outpatient + wellness", link: "https://www.bupaglobal.com/en/individuals/our-plans" },
    ],
  },
  {
    name: "UnitedHealthcare", type: "Health", country: "USA",
    highlights: ["1.3M providers", "Telehealth", "Rewards program"],
    website: "https://www.uhc.com", cashless: true,
    plans: [
      { planName: "Choice Plus PPO", coverage: "Marketplace", startingPrice: "$420/mo", bestFor: "Nationwide PPO flexibility", link: "https://www.uhc.com/individual-and-family" },
      { planName: "Bronze HMO", coverage: "Marketplace", startingPrice: "$280/mo", bestFor: "Low premium individual", link: "https://www.uhc.com/individual-and-family" },
    ],
  },
  {
    name: "Aetna (CVS Health)", type: "Health", country: "USA",
    highlights: ["MinuteClinic access", "Prescription savings", "Mental health"],
    website: "https://www.aetna.com", cashless: true,
    plans: [
      { planName: "Aetna Silver PPO", coverage: "Marketplace", startingPrice: "$390/mo", bestFor: "Balanced premium / deductible", link: "https://www.aetna.com/individuals-families.html" },
      { planName: "Aetna Gold HMO", coverage: "Marketplace", startingPrice: "$510/mo", bestFor: "Lower out-of-pocket", link: "https://www.aetna.com/individuals-families.html" },
    ],
  },
  {
    name: "Blue Cross Blue Shield", type: "Health", country: "USA",
    highlights: ["Nationwide network", "PPO/HMO plans", "Wellness rewards"],
    website: "https://www.bcbs.com", cashless: true,
    plans: [
      { planName: "Blue Advantage HMO", coverage: "Marketplace", startingPrice: "$320/mo", bestFor: "Affordable HMO", link: "https://www.bcbs.com/find-a-plan" },
      { planName: "Blue Choice PPO", coverage: "Marketplace", startingPrice: "$465/mo", bestFor: "Out-of-network freedom", link: "https://www.bcbs.com/find-a-plan" },
    ],
  },
];

const Insurance = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filters = ["All", "Health", "Life", "General"];
  const filtered = BRANDS.filter((b) => {
    const matchesFilter = filter === "All" || b.type === filter || (filter === "Health" && b.type === "Multi");
    const q = query.toLowerCase();
    const matchesQuery = !q || b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q) || b.highlights.some((h) => h.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">🛡️ Insurance Hub</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Health Insurance Directory
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare and explore health insurance plans from {BRANDS.length}+ leading brands across India and worldwide.
          </p>
        </div>

        {/* Search + filters */}
        <div className="glass rounded-2xl p-4 mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search insurer, country, feature..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-gradient-to-r from-primary to-accent text-white" : "bg-muted/50 hover:bg-muted"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b) => (
            <Card key={b.name} className="glass p-5 flex flex-col hover:border-primary/50 transition-all hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="text-xs">{b.type}</Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Globe className="h-3 w-3" />{b.country}</span>
                </div>
              </div>
              <h3 className="font-bold text-base mb-2">{b.name}</h3>
              <ul className="space-y-1 mb-3 flex-1">
                {b.highlights.map((h) => (
                  <li key={h} className="text-xs flex items-start gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {b.cashless && <Badge className="mb-3 w-fit bg-accent/10 text-accent border-accent/20 text-[10px]">⚡ Cashless</Badge>}
              <div className="flex gap-2 mt-auto">
                <a href={b.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" /> Visit
                  </Button>
                </a>
                {b.helpline && (
                  <a href={`tel:${b.helpline}`}>
                    <Button size="sm" variant="outline" className="glass"><Phone className="h-3 w-3" /></Button>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="glass p-10 text-center mt-6">
            <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-muted-foreground">No insurers match your search.</p>
          </Card>
        )}

        <div className="mt-10 glass rounded-2xl p-6 text-center text-sm text-muted-foreground">
          ℹ️ This directory is informational only. Always read policy documents and compare plans on official websites before purchasing. MediSoul does not sell or broker insurance.
        </div>
      </div>
    </div>
  );
};

export default Insurance;
