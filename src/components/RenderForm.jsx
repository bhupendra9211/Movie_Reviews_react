import { useState } from "react";

export function RenderForm({reviewAdded}) {
  const [comment, setComment] = useState("");

  return (
    <>
    <p className="text-2xl font-bold text-red-600" style={{ fontFamily: "Cinzel, serif" }}>Reviews:</p>
    <form className="mt-2 flex items-center space-y-2 py-2 rounded shadow-md w-full ">
        
      <div className="mr-5">
      <textarea
        placeholder="Review..."
        value={comment}
        onChange={(e) =>setComment(e.target.value)}
        className="w-full mr-28 p-2 border-black rounded focus:outline-none focus:border-blue-500 text-white bg-gray-700"
      />
      </div>

      <button
      className="button bg-red-700 hover:bg-red-600 px-4 py-2 border-black rounded-lg"
      onClick={(e) => reviewAdded(e, comment, setComment)}
      >
        Save
      </button>

    </form>
    </>
  );
}
