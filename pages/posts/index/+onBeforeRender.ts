import { QueryClient, dehydrate } from "@tanstack/react-query";
import { postKeys } from "../queries";

export default async function onBeforeRender() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 5000
            }
        }
    })

    await queryClient.prefetchQuery(postKeys.all)
    const dehydratedState = dehydrate(queryClient)

    return {
        pageContext: {
            dehydratedState,
            title: "Posts List"
        }
    }
}