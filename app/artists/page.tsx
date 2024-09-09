import { redirect } from "next/navigation";

export default function ArtistPage() {
  // You can not visit this page without an ID
  redirect("/");
}
