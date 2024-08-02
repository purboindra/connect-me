import { getCurrentUser } from "@/app/actions/user.action";
import { EditProfileForm } from "@/components/shared/EditProfileForm";
import { ParamsProps } from "@/types";
import React from "react";

export default async function page({ params }: ParamsProps) {
  const user = await getCurrentUser();

  return (
    <>
      <h1 className="text-lg font-semibold text-center max-sm:pt-8">
        Edit Profile
      </h1>
      <div className="mt-9">
        <EditProfileForm user={user} />
      </div>
    </>
  );
}
