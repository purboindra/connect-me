import { getCurrentUser } from "@/app/actions/user.action";
import HeaderProfile from "@/components/shared/HeaderProfile";
import StatsProfile from "@/components/shared/StatsProfile";
import TabsProfile from "@/components/shared/TabsProfile";
import Highlight from "@/components/shared/Highlight";
import React from "react";

export default async function page() {
  /// TODO USE COOKIES OR STORAGE FOR
  /// OPTIMIZE REQUEST

  const user = await getCurrentUser();

  return (
    <section className="max-w-5xl flex flex-col mx-auto max-sm:pt-8">
      <HeaderProfile user={user} currentUserId={user.id} />
      {/* HIGHLIGHT */}

      <Highlight />

      {/* STATS */}
      <StatsProfile user={user} />

      {/* POST */}
      <TabsProfile userId={user.id} />
    </section>
  );
}
