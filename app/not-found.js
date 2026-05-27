import AppShell from "@/components/AppShell";
import NotFoundTerminal from "@/components/NotFoundTerminal";

export const metadata = {
  title: "404",
  description: "Lost terminal state inside horsepower."
};

export default function NotFound() {
  return (
    <AppShell>
      <NotFoundTerminal />
    </AppShell>
  );
}
