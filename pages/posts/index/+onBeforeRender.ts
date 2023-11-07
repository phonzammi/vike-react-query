import { QueryClient, dehydrate, hashKey } from "@tanstack/react-query";

import { postsQueries } from "../postsQueries";
import useQueriesState from "../../../stores/queriesState";

export default async function onBeforeRender() {
    let title = 'Posts List';
    const knownQueries = useQueriesState.getState().knownQueries
    const queryKey = hashKey(postsQueries.list.queryKey)

    if (!knownQueries.get(queryKey)) {
        // We haven't started fetching the list of posts yet.

        // Note: this gets executed only once per browser session, namely the
        // first time this page gets visited. If this visit happens coming from
        // another page through client-side navigation, this gets executed on
        // the client. Otherwise it gets executed on the server.

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