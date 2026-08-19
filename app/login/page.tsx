import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="isolate flex h-screen items-center justify-center">
      <Image
                src="/login.png"
                alt="Chats sportifs"
                fill
                className="object-cover -z-10"
                priority
            />
      <LoginForm />
    </div>
  );
}
