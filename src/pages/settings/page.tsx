import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import AvatarComponent from "./avatar";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          this is the shared data with others.
        </p>
      </div>
      <Separator />
      <AvatarComponent/>
      <Separator />
      <ProfileForm />
    </div>
  )
}
