import { formatCurrency, formatDate } from "@core/utils";
import { theme } from "@core/ui";
import { appEnv } from "../../shared/lib/env";
import { useAuthStore } from "../auth/auth-store";

export function DashboardPage() {
  const email = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Base project dashboard</h1>
        </div>
        <button className="secondary" onClick={logout} type="button">
          Log out
        </button>
      </header>

      <section className="grid">
        <article className="metric">
          <span>Signed in</span>
          <strong>{email}</strong>
        </article>
        <article className="metric">
          <span>Environment</span>
          <strong>{appEnv.APP_ENV}</strong>
        </article>
        <article className="metric">
          <span>API base URL</span>
          <strong>{appEnv.API_BASE_URL}</strong>
        </article>
        <article className="metric">
          <span>Sample value</span>
          <strong>{formatCurrency(12840)}</strong>
        </article>
      </section>

      <section className="panel">
        <h2>Starter standards</h2>
        <ul>
          <li>Feature-first folders for app code.</li>
          <li>Shared API, env, UI tokens, utils, and test utilities.</li>
          <li>Typecheck, lint, test, and build scripts ready for CI.</li>
          <li>Token source: {theme.colors.primary}</li>
          <li>Generated on {formatDate(new Date())}</li>
        </ul>
      </section>
    </main>
  );
}
