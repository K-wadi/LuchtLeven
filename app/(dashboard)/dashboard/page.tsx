import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | LuchtLeven",
  description: "Je persoonlijke CF-dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welkom terug! Hier is een overzicht van je gezondheid.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Longfunctie</h3>
          </div>
          <div className="text-2xl font-bold">82%</div>
          <p className="text-xs text-muted-foreground">
            +2.1% vergeleken met vorige week
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Medicatie</h3>
          </div>
          <div className="text-2xl font-bold">95%</div>
          <p className="text-xs text-muted-foreground">
            Therapietrouw deze week
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Oefeningen</h3>
          </div>
          <div className="text-2xl font-bold">4/5</div>
          <p className="text-xs text-muted-foreground">
            Voltooide oefeningen vandaag
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Volgende Afspraak</h3>
          </div>
          <div className="text-2xl font-bold">15 Apr</div>
          <p className="text-xs text-muted-foreground">
            Controle bij Dr. Jansen
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Longfunctie Trend</h3>
              {/* Chart will be added here */}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4">Komende Taken</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medicatie innemen</p>
                    <p className="text-xs text-muted-foreground">Vandaag 12:00</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Fysiotherapie</p>
                    <p className="text-xs text-muted-foreground">Vandaag 15:00</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Longfunctietest</p>
                    <p className="text-xs text-muted-foreground">Morgen 10:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 