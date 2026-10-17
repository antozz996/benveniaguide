import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { logoutAction } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/dal";

export function AreaNavSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-[78px] animate-pulse rounded-[2rem] border border-line bg-paper"
    />
  );
}

/** Barra dell'area riservata: utente collegato, link admin e logout. */
export async function AreaNav() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-line bg-paper px-5 py-4 shadow-soft sm:px-6">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.18em] text-copper-700 uppercase">
          Area riservata
        </p>
        <p className="mt-1 truncate text-sm font-medium text-forest">
          {user.email}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        {user.role === "admin" ? (
          <Button href="/area/admin" variant="quiet">
            <LayoutDashboard aria-hidden="true" className="h-4 w-4" />
            Pannello admin
          </Button>
        ) : null}
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Esci
          </Button>
        </form>
      </div>
    </div>
  );
}
