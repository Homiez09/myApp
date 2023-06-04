import { Avatar, Button } from "@nextui-org/react"
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
    if (textArea == null) return;
    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`;
}

const NewTweetForm: NextPage = () => {
    const { status } = useSession();
    if (status !== "authenticated") return null;

    return <Form />
}

const Form = () => {
    const { status, data: session } = useSession();
    const [inputValue, setInputValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>();

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, [])

    useLayoutEffect(() => {
        updateTextAreaSize(textAreaRef.current);
    }, [inputValue])

    const createTwoot = api.twoot.create.useMutation({
        onSuccess: (newTwoot) => {
            setInputValue("");
        },
    });

    const handleSubmit = (e: FormEvent) => {
        //if (inputValue.trim() === "") return;
        
        e.preventDefault();
        createTwoot.mutate({ content: inputValue });
    }

    if (status !== "authenticated") return null;

    return (
        <div className="px-4 py-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b py-2">
                <div className="flex gap-4">
                    <Avatar squared src={session?.user.image || '/Avatar.png'} />
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" placeholder="What's happening?" />
                </div>
                <Button auto className="self-end" type="submit">Twoot</Button>
            </form>
        </div>
    )
}

export default NewTweetForm;