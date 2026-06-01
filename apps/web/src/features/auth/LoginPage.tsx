import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { colors } from "@core/ui";
import { useAuthStore } from "./auth-store";

const loginSchema = z.object({
  email: z.string().email(),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "developer@example.com",
    },
  });

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">CoreHFM Base</p>
        <h1>React starter for fast product teams</h1>
        <p className="lede">
          Vite, routing, mock auth, TanStack Query, shared env validation, API client, and workspace
          packages are wired for the first feature.
        </p>

        <form
          className="form"
          onSubmit={handleSubmit((values) => {
            const parsed = loginSchema.safeParse(values);

            if (parsed.success) {
              login(parsed.data.email);
            }
          })}
        >
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email ? (
            <span style={{ color: colors.danger }}>{errors.email.message}</span>
          ) : null}

          <button type="submit">Continue</button>
        </form>
      </section>
    </main>
  );
}
