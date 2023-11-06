import React, { useEffect, useState } from 'react'
import { postsQueries, usePostQuery } from '../postsQueries'
import { hashKey } from '@tanstack/react-query'
import useQueriesState from '../../../stores/queriesState'

const Page = ({ id }: { id: string }) => {
    const [hashedKey] = useState(() => hashKey(postsQueries.detail(id).queryKey))
    const setIsFetched = useQueriesState((state) => state.set)
    const postQuery = usePostQuery(id)

    useEffect(
        () => {
            setIsFetched(hashedKey, postQuery.isFetched)
        },
        [setIsFetched, hashedKey, postQuery.isFetched]
    )


    if (postQuery.isError) return <h3>Error {postQuery.error.message}</h3>

    return (
        <>
            <i>isLoading : {`${postQuery.isLoading}`}</i>
            <h1>Post detail</h1>
            <h2>{postQuery.data?.title}</h2>
            <p>{postQuery.data?.body}</p>

            <p>
                Source: <a href={`https://jsonplaceholder.typicode.com/posts/${id}`}>jsonplaceholder.typicode.com/posts/{id}</a>.
            </p>
        </>
    )
}
export default Page