import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  // 1. Manage fetched data using the useState Hook, initialized to an empty array
  const [posts, setPosts] = useState([]);
  // 2. Show a loading indicator while data is being fetched using conditional rendering
  const [loading, setLoading] = useState(true);
  // 3. Handle API errors and display error messages using error state
  const [error, setError] = useState(null);

  // 4. Perform API calls using the useEffect Hook for side effects
  // The empty dependency array [] ensures the API call runs only once on component load
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        // Check if the network response was ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Update the state with the fetched data
        setPosts(data);
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        // Catch any errors and set the error state
        setError(error);
        // Set loading to false
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchPosts();
  }, []);

  // Conditional rendering for loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Display the retrieved data dynamically using state-based rendering
  return (
    <div>
      <h1>Posts List</h1>
      {/* Structure the UI to display multiple data items using list rendering with map() */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
