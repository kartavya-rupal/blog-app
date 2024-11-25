import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const isLoggedIn = useSelector((state) => state.auth.status)

    if (isLoggedIn) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap m-32 ">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Welcome to Narrato
                        </h1>
                        <h2>login to create posts</h2>
                        
                    </div>
                </div>
            </Container>
        </div>
    )
}


export default Home
