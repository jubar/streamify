import { Link, User } from "@nextui-org/react";

export default function UserPresence() {
  return (
    <User
      name="Julio Barrios"
      description={
        <Link
          href="https://linkedin.com/in/julio-barrios-uy"
          size="md"
          className="text-white/90 text-md mt-1 ml-1 drop-shadow-sm"
          isExternal
        >
          @julio-barrios-uy
        </Link>
      }
      classNames={{
        name: "text-lg text-white/90 ml-1 drop-shadow-sm",
      }}
      avatarProps={{
        isBordered: true,
        color: "success",
        size: "lg",
        src: "https://www.gravatar.com/avatar/51aaaebc5b833211facbe04fbd3a7a5c.jpg?s=200",
      }}
    />
  );
}
