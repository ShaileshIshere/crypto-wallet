"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { mnemonicState, walletNoState, walletState, keyState } from "@/state/atoms";
import { Button } from "./UI/button";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Trash, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/UI/alerts";
import { useRouter } from "next/navigation";

const AddWallet = () => {
    const router = useRouter();
    const [WalletNo, setWalletNo] = useRecoilState(walletNoState);
    const mnemonic = useRecoilValue(mnemonicState);
    const [getwallet, setwallet] = useRecoilState(walletState);
    const [visibleKeys, setVisibleKeys] = useRecoilState(keyState);

    const toggleKeyVisibility = (index: number) => {
        setVisibleKeys(prev => {
            const updatedVisibility = [...prev];
            updatedVisibility[index] = !updatedVisibility[index];
            return updatedVisibility;
        });
    };

    const hanldeRemoveAllWallets = () => {
        setWalletNo([]);
        toast.warning("All Wallets Removed");
    };

    const hanldeRemoveWallets = (index: number) => {
        setWalletNo(WalletNo.filter((_, i) => i !== index));
        toast.warning(`Wallet No-${index + 1} Removed `);
    };
    const hanldeChangeWalletsType = () => {
        setwallet("");
        router.push("/");
    };
    let walletType;
    if (getwallet === "Ethereum") {
        walletType = 501;
    } else if (getwallet === "Solana") {
        walletType = 44;
    } else {
        walletType = 0;
    }
    const handleAddWallet = () => {
        const seed = mnemonicToSeedSync(mnemonic.join(" "));
        const path = `m/44'/${walletType}'/${WalletNo.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const publicKey = Keypair.fromSecretKey(
        keyPair.secretKey
        ).publicKey.toBase58();
        const privateKey = Buffer.from(keyPair.secretKey).toString("hex");
        setWalletNo([...WalletNo, { publicKey, privateKey }]);
        toast.success("New Wallet Created");
    };

    const wallet = useRecoilValue(walletState);

    return (
        <>
        <AnimatePresence>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="h-fit w-full py-8 flex flex-wrap gap-5 md:justify-between justify-center items-center"
            >
            <h1 className="md:text-5xl text-4xl font-bold ">{wallet} Wallet</h1>
            <div className="flex flex-wrap md:gap-4 gap-2">
                <Button className="sm:w-auto w-full" onClick={handleAddWallet}>Add Wallet</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="sm:w-auto w-full bg-red-600 hover:bg-red-500">
                            Remove All Wallets
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            your All Your wallet keys .
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={hanldeRemoveAllWallets}>
                            Continue
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className="sm:w-auto w-full bg-blue-600 hover:bg-blue-500">
                            Change Bitcoin
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            all Your Wallet and all Keys.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={hanldeChangeWalletsType}>
                            Continue
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            </motion.div>
            <div className="min-h-[65vh] max-h-fit w-full flex flex-col md:gap-8 gap-4 pb-10">
                {WalletNo.map((wallet, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        key={index}
                        className="h-fit border-[1px] border-[#6363637c] rounded-2xl w-full flex-col flex justify-center items-center"
                    >
                        <div className="w-full md:p-8 p-4 flex justify-between items-center">
                            <h1 className="text-3xl font-semibold flex justify-center items-center">
                                Wallet {index + 1}
                            </h1>
                            <Button
                                onClick={() => hanldeRemoveWallets(index)}
                                className="px-2 rounded-full text-white bg-red-600 hover:bg-red-700"
                            >
                                <Trash className="text-3xl w-full h-full" />
                            </Button>
                        </div>
                        <div className="bg-zinc-900 h-fit w-full rounded-2xl md:p-10 p-5">
                            <h1 className="md:text-2xl text-lg font-semibold flex items-center md:pb-5">
                                Public Key
                            </h1>
                            <h2 className="break-words">{wallet.publicKey}</h2>
                            <h1 className="md:text-2xl text-lg md:pt-8 pt-4 font-semibold flex items-center md:pb-5">
                                Private Key
                            </h1>
                            <div className="flex">
                                <h2 className="break-words w-[60vw]">
                                    {visibleKeys[index] ? wallet.privateKey : '•'.repeat(wallet.privateKey.length / 1.2)}
                                </h2>
                                <p className="flex flex-col justify-center cursor-pointer" onClick={() => toggleKeyVisibility(index)}>
                                    {visibleKeys[index] ? (
                                        <EyeOff className="size-4" />
                                        ) : (
                                        <Eye className="size-4" />
                                    )}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
        </>
    );
};

export default AddWallet;