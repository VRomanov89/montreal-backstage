import Link from "next/link";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { MontrealMap } from "@/components/ui/MontrealMap";
import { getPosts } from "@/lib/beehiiv";
import { HomePageClient } from "@/components/pages/HomePageClient";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const recentIssues = await getPosts(3);

  return <HomePageClient recentIssues={recentIssues} />;
}
