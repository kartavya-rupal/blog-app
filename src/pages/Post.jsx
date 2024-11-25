import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    // const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         if (slug) {
    //             try {
    //                 const post = await service.getPost(slug);
    //                 if (post) {
    //                     setPost(post);
    //                     // Check if the current user is the author after post is fetched
    //                     if (userData && post.userId === userData.$id) {
    //                         setIsAuthor(true);
    //                     } else {
    //                         setIsAuthor(false);
    //                     }
    //                 } else {
    //                     navigate("/");
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching post:", error);
    //             }
    //         } else {
    //             navigate("/");
    //         }
    //     };

    //     fetchPost(); // Call the async function
    // }, [slug, navigate, userData, isAuthor]); // Ensure to include userData in the dependency array


    


    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {post && isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}