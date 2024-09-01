import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const Comments = ({ticket, fetchTicket}) => {
    const {id} = useParams();
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/comment/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get("token")}`
                },
                body: JSON.stringify({
                    "content": newComment
                })
            })
            if (res.ok) {
                setNewComment("");
                fetchTicket();
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    {/* Sekcja komentarzy */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
    <div className="space-y-4">
      {ticket.comments ? 
        ticket.comments.toReversed().map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div><strong>Username:</strong> {comment.username}</div>
            <div><strong>Created On:</strong> {comment.createdOn}</div>
            <div><strong>Content:</strong> {comment.content}</div>
            </div>
        ))
    :
        ""
    }
    </div>
  </div>
  {/* Formularz dodawania komentarza */}
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Comment</h2>
    <form onSubmit={handleCommentSubmit}>
      <textarea
        className="w-full p-4 border rounded-lg mb-4"
        rows="4"
        placeholder="Write your comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Comment
      </button>
    </form>
  </div>
  </>
  )
}

export default Comments