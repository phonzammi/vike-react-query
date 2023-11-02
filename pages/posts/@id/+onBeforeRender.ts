import { QueryClient, dehydrate } from "@tanstack/react-query";
import { postKeys } from "../queries";
import { PageContextBuiltInServer } from "vike/types";

export default async function onBeforeRender(pageContext: PageContextBuiltInServer) {
    const { id } = pageContext.routeParams
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 5000
            }
        }
    })

    const post = await queryClient.fetchQuery(postKeys.detail(id))
    const dehydratedState = dehydrate(queryClient)

    return {
        pageContext: {
            dehydratedState,
            pageProps: {
                id
            },
            title: post.title || "Post Detail"
        }
    }
}