import { useState } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, description, coverImage }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
        <div className="relative h-48 w-full">
          {!imageError ? (
            <img
              src={coverImage}
              alt={title}
              className="object-cover h-full w-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Image unavailable</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;