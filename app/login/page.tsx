import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="fixed inset-0 isolate flex items-center justify-center">
      <Image
        src="/login.png"
        alt="Chats sportifs"
        fill
        sizes="100vw"
        className="object-cover -z-10"
        priority
      />
      <LoginForm />
    </div>
  );
}
