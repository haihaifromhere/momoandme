import KeepsakeApp from "@/components/KeepsakeApp";
import { isUnlocked } from "@/lib/auth";
import { getClientKeepsakeContent } from "@/content/keepsake-content";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const unlocked = await isUnlocked();
  const content = unlocked ? getClientKeepsakeContent() : null;
  const params = await searchParams;
  const unlockError = params.error === "1";

  return (
    <KeepsakeApp
      initiallyUnlocked={unlocked}
      initialContent={content}
      unlockError={unlockError}
    />
  );
}
