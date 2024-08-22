import MnemonicInput from "@/components/MnemonicInput";
import Navbar from "@/components/Navbar";
import BlockChain from "@/components/SetBlockChains";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-4 p-4 min-h-[93vh] dark:bg-[#0A0A0A]">
      <Navbar />
      <BlockChain />
      <MnemonicInput />
    </div>
  );
}
