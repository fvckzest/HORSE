"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import AdminConsole from "@/components/AdminConsole";

export default function AdminGate() {
  const authIsConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return null;
    return createClient(url, key);
  }, []);
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSignIn(event) {
    event.preventDefault();
    if (!supabase || isBusy) return;

    setIsBusy(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
    } catch (error) {
      setMessage(error.message || "Could not sign in.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  if (session) {
    return (
      <AdminConsole
        accessToken={session.access_token}
        initialEntries={[]}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <section
      className="terminal-panel command-console admin-console"
      aria-label="admin sign in"
    >
      <div className="admin-output terminal-output" aria-live="polite">
        <p>
          {authIsConfigured
            ? "sign in with the Supabase user attached to the zest.art database."
            : "Supabase auth env vars are missing. Add them, restart dev, then sign in here."}
        </p>
        {message ? <p>{message}</p> : null}
      </div>

      <form className="command-form" onSubmit={handleSignIn}>
        <label htmlFor="admin-email">email</label>
        <div className="prompt-row">
          <span aria-hidden="true">auth@zest:~$</span>
          <input
            id="admin-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            disabled={!authIsConfigured}
            required
          />
        </div>

        <label htmlFor="admin-password">password</label>
        <div className="prompt-row">
          <span aria-hidden="true">password</span>
          <input
            id="admin-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={!authIsConfigured}
            required
          />
          <button type="submit" disabled={isBusy || !authIsConfigured}>
            {isBusy ? "wait" : "enter"}
          </button>
        </div>
      </form>
    </section>
  );
}
