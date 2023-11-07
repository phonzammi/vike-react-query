import React, { useEffect, useState } from 'react'
import { postsQueries, usePostsQuery } from '../postsQueries'
import { hashKey } from '@tanstack/query-core'
import useQueriesState from '../../../stores/queriesState'

const Page = () => {
    const [hashedQueryKey] = useState(() => hashKey(postsQueries.list.queryKey))
    const postsQuery = usePostsQuery()

    useEffect(() => {
        useQueriesState.setState((prev) => ({
            // See https://docs.pmnd.rs/zustand/guides/maps-and-sets-usage
            // knownQueries: new Map(prev.knownQueries).set(hashedQueryKey, postsQuery.isFetched), //Triggers Rerender
            knownQueries: prev.knownQueries.set(hashedQueryKey, postsQuery.isFetched), /// Doesn't Trigger Rerender
        }))
    }, [hashedQueryKey, postsQuery.isFetched])

    return (
        <>
            <i>isLoading : {`${postsQuery.isLoading}`}</i>
            <h1>Posts</h1>

            <ol>
                {postsQuery.data?.map(({ id, title }) => (
                    <li key={id}>
                        <a href={`/posts/${id}`}>{title}</a>
                    </li>
                ))}
            </ol>

            <p>
                Source: <a href="https://jsonplaceholder.typicode.com/posts">jsonplaceholder.typicode.com/posts</a>.
            </p>
        </>
    )
}

export default Page