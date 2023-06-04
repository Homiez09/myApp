import { NextPage } from "next";
import { api } from "~/utils/api";
import InfiniteTwootList from "./InfiniteTwootList";

const RecentTweetForm: NextPage<{}> = () => {
    const twoots = api.twoot.infiniteFeed.useInfiniteQuery(
        {}, 
        { 
            getNextPageParam: (lastPage) => lastPage.nextCursor
        }
    );

    return (
        <InfiniteTwootList 
            twoots={twoots.data?.pages.flatMap((page) => page.twoots) || []}
            isError={twoots.isError}
            isLoading={twoots.isLoading}
            hasNextPage={twoots.hasNextPage || false}
            fetchNewTwoots={twoots.fetchNextPage} 
            hasMore={twoots.hasNextPage || false} 
        />
    )
}

export default RecentTweetForm;