import AppShell from "@/components/AppShell";
import FilePreviewGrid from "@/components/FilePreviewGrid";
import PageHeader from "@/components/PageHeader";
import { fileFragments } from "@/data/files";

export const metadata = {
  title: "files",
  description:
    "A small archive of horsepower fragments, notes, logs, and backend artifacts."
};

export default function FilesPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="/files"
        title="artifact directory"
        description="Local fragments. Some real, some placeholder, all structurally useful."
      />
      <FilePreviewGrid files={fileFragments} />
    </AppShell>
  );
}
