export function DisplayReview({ review }) { 
    return (
      <div>
          <p className="bg-gray-600 p-1 pl-2 rounded-lg mb-2">
            {review?.description}
          </p>      
      </div>
    );
  }
  