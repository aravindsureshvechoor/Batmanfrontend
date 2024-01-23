import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const Usercommentbox = ({ isOpen, toggle }) => {
  
    // Mock data for comments
  const comments = [
    {
      id: 1,
      user: 'User 1',
      level: 1,
      content: 'This is a sample comment',
      date : '         27-08-1998'
    },
    // Add more comments as needed
  ];

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="comment-modal">
        <ModalHeader toggle={toggle} style={{ background: '#131313', color: '#ffc700' }}>
          Comments
        </ModalHeader>
        <ModalBody style={{ background: '#131313' }}>
          <div className="comment-container">
            {/* Display Comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-content">
                  <div className="comment-user">
                    <div>
                      <h3 className="font-bold text-sm">{comment.user}</h3>
                      
                    </div>
                  </div>
                  <div className='justify-center flex mr-32'>
                  <p className="text-gray-600 mt-2">{comment.content}</p>
                  <p className="text-gray-600 mt-2">on{comment.date}</p>
                  </div>
                  {/* <button className="text-right text-blue-500">Reply</button> */}
                </div>

                {/* Display Replies
                {comment.replies && (
                  <div className="replies ml-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply">
                        <div className="reply-content">
                          <div className="reply-user">
                            <div>
                              <h3 className="font-bold">{reply.user}</h3>
                              
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            ))}

            {/* Comment Input */}
            <div className="w-full px-3 mb-2 mt-6">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Comment"
                required
              ></textarea>
            </div>

            {/* Post Comment Button */}
            <div className="w-full flex justify-end px-3 my-3">
              <input
                type="submit"
                className="px-2.5 py-1.5 rounded-md text-black text-sm bg-yellow-400 text-lg"
                value="Post Comment"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            onClick={toggle}
            style={{ backgroundColor: '#131313', color: '#ffc700' }}
          >
            Cancel
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Usercommentbox;
