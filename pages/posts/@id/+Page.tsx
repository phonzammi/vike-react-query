import React from 'react'
import { usePostQuery } from '../queries';

const Page = ({ id }: { id: number | string }) => {

    const postQuery = usePostQuery(id)

    if (postQuery.isError) return <h3>Error {postQuery.error.message}</h3>

    if (postQuery.isSuccess)
        return (
            <>
                <i>isLoading : {`${postQuery.isLoading}`}</i>
                <h1>Post detail</h1>
                <h2>{postQuery.data.title}</h2>
                <p>{postQuery.data.body}</p>

                <p>
                    Source: <a href={`https://jsonplaceholder.typicode.com/posts/${id}`}>jsonplaceholder.typicode.com/posts/{id}</a>.
                </p>
            </>
        )
}

export default Page