import { Loading , Text } from "@nextui-org/react";

const LoadingStyle = () => {
    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Text className="prompt" size={"$4xl"}>
                        <Loading size="lg" />
                    </Text>
                </div>
            </div>
        </>
    );
}

export default LoadingStyle;