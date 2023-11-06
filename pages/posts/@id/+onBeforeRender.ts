import { QueryClient, dehydrate, hashKey } from "@tanstack/react-query";
import { PageContextBuiltInServer } from "vike/types";
import { postsQueries } from "../postsQueries";
import useQueriesState from "../../../stores/queriesState";

export default async function onBeforeRender(pageContext: PageContextBuiltInServer) {
    let title = "Post Detail";
    const fetchedQueries = useQueriesState.getState().fetchedQueries
    const { isClientSideNavigation, routeParams: { id } } = pageContext

    if (isClientSideNavigation === false || fetchedQueries.has(hashKey(postsQueries.detail(id).queryKey).valueOf()) === false) {
        console.log('posts/id/+onBeforeRender is fetcing... id : ', id)
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    gcTime: 5000
                }
            }
        })

        const post = await queryClient.fetchQuery(postsQueries.detail(id))
        const dehydratedState = dehydrate(queryClient)
        title = post.title
        return {
            pageContext: {
                dehydratedState,
                pageProps: {
                    id
                },
                title
            }
        }
    }

    return {
        pageContext: {
            pageProps: {
                id
            },
            title
        }
    }
}