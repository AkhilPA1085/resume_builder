"use client";

import { useEffect, useState } from "react";

function TemplateForm() {
  const [formData, setFormData] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    // Retrieve and parse the form data from localStorage
    const storedData = localStorage.getItem("education");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []); // Runs only once when the component mounts

  console.log(formData)

  return (
    <div>
      <h2>Form Data</h2>
      {/* {formData && Object.keys(formData).length > 0 ? (
        <ul>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value || "Not provided"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found.</p>
      )} */}
    </div>
  );
}

export default TemplateForm;
