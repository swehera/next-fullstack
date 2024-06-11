import Alldata from "@/components/Alldata";
import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <Alldata user={user} />
    </main>
  );
}
