import { AlertCircle } from "lucide-react";
import React from "react";

const Error = ({error}) => {
  return (
    <>
      {" "}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <AlertCircle className="inline-block w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </>
  );
};

export default Error