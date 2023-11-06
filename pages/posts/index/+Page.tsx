import React, { useEffect, useState } from 'react'
import { postsQueries, usePostsQuery } from '../postsQueries'
import { hashKey } from '@tanstack/query-core'
import useQueriesState from '../../../stores/queriesState'

const Page = () => {
    const [hashedKey] = useState(() => hashKey(postsQueries.list.queryKey))
    const setIsFetched = useQueriesState((state) => state.set)

    const postsQuery = usePostsQuery()

    useEffect(
        () => {
            setIsFetched(hashedKey, postsQuery.isFetched)
        },
        [setIsFetched, hashedKey, postsQuery.isFetched]
    )

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