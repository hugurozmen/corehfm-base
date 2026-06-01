import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";
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
      email: "deniz@cafinder.app",
    },
  });

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <p className="eyebrow">Cafinder Preview</p>
        <h1>Turkce kahve kesif deneyimi</h1>
        <p className="lede">
          Mobile-first Cafinder mockuplarini base proje uzerinde canli preview olarak incele.
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
          <label htmlFor="email">Preview email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email ? <span className="field-error">{errors.email.message}</span> : null}

          <button type="submit">Open Cafinder</button>
        </form>
      </section>
    </main>
  );
}
