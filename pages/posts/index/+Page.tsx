import React from 'react'
import { usePostsQuery } from '../queries';

const Page = () => {
    const postsQuery = usePostsQuery()

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