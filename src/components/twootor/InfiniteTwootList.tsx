import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Text, Button, Row, Avatar, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoadingStyle from "../LoadingSpinner";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { IconHoverEffect } from "./IconHoverEffect";
import { api } from "~/utils/api";

type TwootProps = {
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: {
        id: string;
        image: string | null;
        name: string | null;
    };
}

type InfiniteTwootListProps = {
    isLoading: boolean;
    isError: boolean;
    hasMore: boolean;
    hasNextPage: boolean;
    twoots: any[];
    fetchNewTwoots: () => Promise<unknown>;
}

type HeartButtonProps = {
    onClick: () => void;
    isLoading: boolean;
    likedByMe: boolean;
    likeCount: number;
};


const dataTimeFormatter = Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
})

const HeartButton = ({
    onClick,
    isLoading,
    likedByMe,
    likeCount,
}: HeartButtonProps) => {
    const session = useSession();
    const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

    if (session.status !== "authenticated") {
        return (
            <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
                <HeartIcon />
                <span>{likeCount}</span>
            </div>
        );
    }

    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${likedByMe
                    ? "text-red-500"
                    : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
                }`}
        >
            <IconHoverEffect red>
                <HeartIcon
                    className={`transition-colors duration-200 ${likedByMe
                            ? "fill-red-500"
                            : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
                        }`}
                />
            </IconHoverEffect>
            <span>{likeCount}0</span>
        </button>
    );
}

const TwootCard = ({ id, user, content, createdAt, likeCount, likedByMe }: TwootProps) => {
    const trpcUtils = api.useContext();
    const toggleLike = api.twoot.toggleLike.useMutation({
        onSuccess: ({ addedLike }) => {
          const updateData: Parameters<
            typeof trpcUtils.twoot.infiniteFeed.setInfiniteData
          >[1] = (oldData) => {
            if (oldData == null) return;
    
            const countModifier = addedLike ? 1 : -1;
    
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  twoots: page.twoots.map((twoot) => {
                    if (twoot.id === id) {
                      return {
                        ...twoot,
                        likeCount: 1 + countModifier,
                        likedByMe: addedLike,
                      };
                    }
    
                    return twoot;
                  }),
                };
              }),
            };
          };
    
          /* trpcUtils.twoot.infiniteFeed.setInfiniteData({}, updateData);
          trpcUtils.twoot.infiniteFeed.setInfiniteData(
            { onlyFollowing: true },
            updateData
          );
          trpcUtils.twoot.infiniteProfileFeed.setInfiniteData(
            { userId: user.id },
            updateData
          ); */
        },
      });

    const handleToggleLike = () => {
        toggleLike.mutate({ id });
    }

    return (
        <div className="flex flex-col py-2 px-3">
            <Card>
                <Card.Header className="gap-2">
                    <Avatar src={user.image || '/Avatar.png'} />
                    <Link href={`/user/${user.id}`} className="font-bold hover:underline">{user.name}</Link>
                    <Text small color="grey">{dataTimeFormatter.format(createdAt)}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                    <Text>
                        {content}
                    </Text>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-3">
                            <HeartButton
                                onClick={handleToggleLike}
                                isLoading={toggleLike.isLoading}
                                likedByMe={likedByMe}
                                likeCount={likeCount}
                            />
                        </div>
                    </div>
                    {/* <Row justify="flex-start">
                        <Button
                            bordered
                            size="sm"
                            color={likedByMe ? 'success' : 'gradient'}
                        >
                            0 Like
                        </Button>
                    </Row> */}
                </Card.Footer>
            </Card>
        </div>
    );
}

const InfiniteTwootList = ({ twoots, isError, isLoading, fetchNewTwoots, hasMore }: InfiniteTwootListProps) => {

    if (twoots == null || twoots.length === 0) {
        return <h2 className="my-4 text-center text-2xl text-gray-500">No Twoots</h2>
    };

    return (
        <InfiniteScroll
            hasMore={hasMore}
            next={fetchNewTwoots}
            dataLength={twoots.length}
            loader={<LoadingStyle />}
            endMessage={<h2 className="my-4 text-center text-2xl text-gray-500">No more Twoots</h2>}

        >
            {isLoading ? <LoadingStyle /> :
                twoots.map((twoot) => {
                    return <TwootCard key={twoot.id} {...twoot} />
                })
            }
        </InfiniteScroll>
    )
}

export default InfiniteTwootList;