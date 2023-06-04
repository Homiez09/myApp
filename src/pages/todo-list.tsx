import { Avatar, Button, Text } from "@nextui-org/react";
import { NextPage } from "next";
import MainLayout from "~/layouts/MainLayout";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const TodoList: NextPage = () => {
    const { data: session, status } = useSession();
    const { push, pathname } = useRouter();

    const handleSubmit = () => { // fake submit
        console.log("submit");
    }

    return (
        <MainLayout>
            <div className="mx-5 mb-4 items-center justify-center">
                <div className="flex flex-col">
                    <div className="flex mb-4 mx-5">
                        <div className="flex flex-col w-3/4">
                            <Text size={'$2xl'}>Todo - <span className="text-gray-400 font-thin">In Progress</span></Text>
                        </div>
                        <div className="flex flex-col w-1/4 justify-center">
                            <a href="#modal-show" className="self-end">
                                <BsPlusSquare className="w-7 h-auto self-end" />
                            </a>
                            <div className="modal" id="modal-show">

                                <div className="modal-box">

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
                                        <a href="#" className="self-end">✕</a>
                                        <div className="flex gap-4">
                                            <Avatar squared src={session?.user.image || '/Avatar.png'} />
                                            <textarea
                                                className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" placeholder="What's happening?" />
                                        </div>
                                        <div className="flex self-end">
                                            <Button auto color="success" className="self-end" type="submit">Save</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-auto border-opacity-50">
                    <div className="divider text-gray-400">In Progress</div>
                    <div className="grid h-20 card bg-base-100 rounded-box">
                        <div className="flex">
                            <div className="flex flex-col w-3/4 mx-5 justify-center">
                                <Text size="$2xl" className="self-start Itim" color="gray">ตีหมา</Text>
                            </div>
                            <div className="flex flex-col w-1/4 mx-5 justify-center">
                                <Button
                                    auto
                                    color="success"
                                    className="self-end"
                                >
                                    Move
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="divider text-gray-400">Complete</div>

                    <div className="grid h-20 card bg-base-300 rounded-box">
                        <div className="flex">
                            <div className="flex flex-col w-3/4 mx-5 justify-center">
                                <Text size="$2xl" className="self-start Itim" color="black">ฆ่าแมว</Text>
                            </div>
                            <div className="flex flex-col w-1/4 mx-5 justify-center">
                                <Button
                                    auto
                                    color="error"
                                    className="self-end"
                                >
                                    Move
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout >
    );
}

export default TodoList;