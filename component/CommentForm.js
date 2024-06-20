'use client';
import { useState } from "react";

export default function CommentForm({ postId }) {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [formData, setFormData] = useState({
    author: '',
    authorEmail: '',
    content: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.author.trim()) errors.author = "Name is required.";
    if (!formData.authorEmail.trim()) {
      errors.authorEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.authorEmail)) {
      errors.authorEmail = "Invalid email format.";
    }
    if (!formData.content.trim()) errors.content = "Message cannot be empty.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formPostId = parseInt(postId, 10);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const data = {
      author: formData.author,
      authorEmail: formData.authorEmail,
      content: formData.content.replace(/\n/g, "\\n"),
      postId: formPostId,
    };

  
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      setSubmitStatus(true);
      setResponseMessage(result.message);
      setAlertColor(response.ok ? 'bg-green-500' : 'bg-red-500');
    } catch (error) {
      setSubmitStatus(true);
      setResponseMessage('An error occurred while submitting your comment.');
      setAlertColor('bg-red-500');
    }
  };

  return (
    <>
      <h3 className="text-2xl pb-4 mb-4 border-b">Add your Thoughts:</h3>
      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2">Name:</label>
          <input type="text" id="author" name="author" className="w-full p-2 border" value={formData.author} onChange={handleChange} required />
          {formErrors.author && <p className="text-red-500 text-sm">{formErrors.author}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="authorEmail" className="block mb-2">Email:</label>
          <input type="email" id="authorEmail" className="w-full p-2 border" name="authorEmail" value={formData.authorEmail} onChange={handleChange} required />
          {formErrors.authorEmail && <p className="text-red-500 text-sm">{formErrors.authorEmail}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">Message:</label>
          <textarea name="content" id="content" className="w-full p-2 border" value={formData.content} onChange={handleChange} required></textarea>
          {formErrors.content && <p className="text-red-500 text-sm">{formErrors.content}</p>}
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600">Submit</button>
      </form>
      {
        console.log("oooo" , responseMessage)
      }
      {
            submitStatus && 
            <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
                {responseMessage}
            </div>
        }
    </>
  );
}
