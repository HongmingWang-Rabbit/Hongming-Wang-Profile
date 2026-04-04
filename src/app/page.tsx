import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

// Root page redirects to default locale.
// The middleware handles this too, but this is a safety fallback.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
