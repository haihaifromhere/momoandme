import KeepsakeApp from "@/components/KeepsakeApp";
import { getClientKeepsakeContent } from "@/content/keepsake-content";

export const dynamic = "force-dynamic";

export default function Home() {
  return <KeepsakeApp content={getClientKeepsakeContent()} />;
}
