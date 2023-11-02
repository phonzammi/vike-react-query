import { useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./postsApi"

const key: string = 'posts';
export const postKeys = {
    all: { queryKey: [key], queryFn: getPosts } as const,
    detail: (id: number | string) => ({ queryKey: [key, id], queryFn: () => getPost(id) }) as const,
}

export function usePostsQuery() {
    return useQuery(postKeys.all)
}

export function usePostQuery(id: number | string) {
    return useQuery(postKeys.detail(id))
}