import { redirect } from "next/navigation";

export const metadata = {
  title: "music"
};

export default function FilesPage() {
  redirect("/music");
}
