import { Link, User } from "@nextui-org/react";

interface UserPresenceProps {
  userName: string;
  userImageUrl: string;
  linkedinUser: string;
}

export default function UserPresence({
  userName,
  userImageUrl,
  linkedinUser,
}: UserPresenceProps) {
  return (
    <User
      name={userName}
      description={
        <Link
          role="link"
          href={`https://linkedin.com/in/${linkedinUser}`}
          size="md"
          className="text-white/90 text-md mt-1 ml-1 drop-shadow-sm"
          isExternal
        >
          @{linkedinUser}
        </Link>
      }
      classNames={{
        name: "text-lg text-white/90 ml-1 drop-shadow-sm",
      }}
      avatarProps={{
        alt: "User image",
        isBordered: true,
        color: "success",
        size: "lg",
        src: userImageUrl,
      }}
    />
  );
}
