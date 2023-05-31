import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn: NextPage = () => {
    const { query } = useRouter();

    return (
        <>
            <div className="flex h-screen w-full flex-col items-center justify-center gap-5 md:flex-row md:p-10">
                <Button
                    className="hover:animate-pulse"
                    onClick={() =>
                        signIn("google", { callbackUrl: query.callbackUrl as string })
                    }
                    auto
                    size={`xl`}
                    color={"primary"}
                    bordered
                >
                    Sign with Google
                </Button>
                <Button
                    className="hover:animate-pulse"
                    onClick={() =>
                        signIn("discord", { callbackUrl: query.callbackUrl as string })
                    }
                    auto
                    size={`xl`}
                    color={"error"}
                    bordered
                >
                    Sign with Discord
                </Button>
                <Link href={"/"} className="text-red-400 text-lg">&lt; Back</Link>
            </div>
        </>
    );
};

export default SignIn;