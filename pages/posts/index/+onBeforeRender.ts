import { QueryClient, dehydrate, hashKey } from "@tanstack/react-query";
import { PageContext } from "vike/types";

import { postsQueries } from "../postsQueries";
import useQueriesState from "../../../stores/queriesState";

export default async function onBeforeRender({ isClientSideNavigation }: PageContext) {
    let title = 'Posts List';
    const fetchedQueries = useQueriesState.getState().fetchedQueries

    if (isClientSideNavigation === false || fetchedQueries.has(hashKey(postsQueries.list.queryKey).valueOf()) === false) {
        console.log('posts/index/+onBeforeRender is fetching ...')
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    gcTime: 5000
                }
            }
        })

        await queryClient.prefetchQuery(postsQueries.list)
        const dehydratedState = dehydrate(queryClient)

        return {
            pageContext: {
                dehydratedState,
                title
            }
        }
    }

    return {
        pageContext: {
            title
        }
    };
}