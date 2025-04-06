// import React, { useState, useRef } from "react";
// import * as html2pdf from "html2pdf.js";

// const Exterior_Tyres = [
//   "Pillar LHS B",
//   "Apron LHS",
//   "Apron RHS",
//   "Apron LHS LEG",
//   "Apron RHS LEG",
//   "Firewall",
//   "Cowl Top",
//   "Upper Cross Member (Bonnet Patti)",
//   "Lower Cross Member",
//   "Radiator Support",
//   "Head Light Support",
//   "Windshield Front",
//   "Grill",
//   "Is the Car Waterlogged?",
//   "RHS Front Tyre",
//   "Roof",
//   "Bonnet/Hood",
//   "Dicky Door / Boot Door",
//   "Boot Floor",
//   "Quarter Panel LHS",
//   "Quarter Panel RHS",
//   "Fender LHS",
//   "Fender RHS",
//   "Pillar LHS A",
//   "Pillar LHS C",
//   "Pillar RHS C",
//   "Pillar RHS B",
//   "Pillar RHS A",
//   "Running Border LHS",
//   "Running Border RHS",
//   "Door LHS Front",
//   "Door LHS Rear",
//   "Door RHS Front",
//   "Door RHS Rear",
//   "Windshield Rear",
//   "Light LHS Headlight",
//   "Light RHS Headlight",
//   "Light LHS Taillight",
//   "Light RHS Taillight",
//   "Bumper Rear",
//   "Bumper Front",
//   "ORVM Manual / Electrical LHS",
//   "ORVM Manual / Electrical RHS",
//   "Tyre Spare Tyre",
//   "LHS Front Tyre",
//   "LHS Rear Tyre",
//   "RHS Front Tyre",
//   "RHS Rear Tyre",



// ];
// const Engines_Transmission = [
//   "Engine",
//   "Exhaust Smoke",
//   "Engine Mounting",
//   "Clutch",
//   "Gear Shifting",
//   "Engine Oil Level Dipstik",
//   "Battery",
//   "Coolant",
//   "Sump",
//   "Engine Sound",
//   "Engine Oil"

// ]
// const Electricals_Interiros = [
//   "2 Power Windows",
//   "Airbag Feature",
//   "Music System",
//   "ABS",
//   "Electrical",
//   "Interior",
//   "No. Of Airbags",
//   "No. Of Power Windows",
//   "Fabric Seat",
//   "Parking Sensor",
//   "No. Of Airbags 2",
//   "No. Of Power Windows"

// ]
// const String_Suspension_Brakes = [
//   "Steering",
//   "Brake",
//   "Suspension"

// ] 

// const Air_Conditionaing = [
//   "AC Cooling",
//   "Heater"
// ]

// const Other_Details = [
//   "Chassis Embossing",
// "RC Availability",
// "Insurance Image",
// "Duplicate Key",

// ]

// const Electricals_Interiors = {};
// const Exterior_Tyre_Imperfect_Images = {};

// const VehicleInspectionForm = () => {
//   const initialData = Object.fromEntries(Exterior_Tyres.map((f) => [f, "Yes"]));
//   const [formData, setFormData] = useState(initialData);

//   //   const [formData, setFormData] = useState({});
//   const [images, setImages] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const submissionRefs = useRef([]);

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 4) {
//       alert("You can only upload up to 4 images.");
//       return;
//     }
//     setImages(files);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const imagePreviews = images.map((file) => URL.createObjectURL(file));

//     const fullEntry = {
//       ...formData,
//       images: imagePreviews,
//       date: new Date().toLocaleString(),
//       inspector: "Inspector Name", // Change to dynamic if needed
//     };

//     setSubmissions((prev) => [...prev, fullEntry]);
//     setFormData({});
//     setImages([]);
//     e.target.reset();
//   };

//   const downloadPDF = (index) => {
//     const element = submissionRefs.current[index];
//     const opt = {
//       margin: 0.2,
//       filename: `Vehicle-Inspection-Submission-${index + 1}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//     };
//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div style={{ maxWidth: "700px", margin: "0 auto", fontFamily: "Arial" }}>
//       <h2>Vehicle Inspection Form</h2>
//       <form onSubmit={handleSubmit}>
//         {Exterior_Tyres.map((field) => (
//           <div key={field} style={{ marginBottom: "15px" }}>
//             <label style={{ fontWeight: "bold" }}>{field}</label>
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={field}
//                   value="Yes"
//                   required
//                   checked={formData[field] === "Yes"}
//                   onChange={() => handleChange(field, "Yes")}
//                 />{" "}
//                 Yes
//               </label>
//               <label style={{ marginLeft: "20px" }}>
//                 <input
//                   type="radio"
//                   name={field}
//                   value="No"
//                   checked={formData[field] === "No"}
//                   onChange={() => handleChange(field, "No")}
//                 />{" "}
//                 No
//               </label>
//             </div>
//           </div>
//         ))}

//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ fontWeight: "bold" }}>Upload Images (Max 4)</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//         </div>

//         <button type="submit" style={{ padding: "10px 20px" }}>
//           Submit
//         </button>
//       </form>

//       <hr style={{ margin: "40px 0" }} />

//       <h3>Submitted Data</h3>
//       {submissions.map((entry, index) => (
//         <div
//           key={index}
//           ref={(el) => (submissionRefs.current[index] = el)}
//           style={{
//             border: "1px solid #ccc",
//             padding: "20px",
//             marginBottom: "30px",
//             backgroundColor: "#fff",
//             fontSize: "14px",
//             color: "#333",
//           }}
//         >
//           {/* HEADER */}
//           <div style={{ textAlign: "center", marginBottom: "20px" }}>
//             {/* Replace src with your logo if needed */}
//             <img
//               src="/logo.png"
//               alt="Logo"
//               style={{ height: "60px", marginBottom: "10px" }}
//             />
//             <h2 style={{ margin: "0", fontSize: "20px" }}>
//               Vehicle Inspection Report
//             </h2>
//             <p style={{ margin: "5px 0" }}>Date: {entry.date}</p>
//           </div>

//           {/* TABLE */}
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               marginBottom: "20px",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     border: "1px solid #000",
//                     padding: "8px",
//                     backgroundColor: "#eee",
//                     textAlign: "left",
//                   }}
//                 >
//                   Parameter
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #000",
//                     padding: "8px",
//                     backgroundColor: "#eee",
//                     textAlign: "left",
//                   }}
//                 >
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {Exterior_Tyres.map((field) => (
//                 <tr key={field}>
//                   <td style={{ border: "1px solid #000", padding: "6px" }}>
//                     {field}
//                   </td>
//                   <td style={{ border: "1px solid #000", padding: "6px" }}>
//                     {entry[field]}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* IMAGES */}
//           {entry.images && (
//             <div>
//               <h4>Attached Images</h4>
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: "10px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 {entry.images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`Upload ${i}`}
//                     style={{ width: "150px", border: "1px solid #ccc" }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* FOOTER */}
//           <div style={{ borderTop: "1px solid #999", paddingTop: "10px" }}>
//             <p>Inspector: {entry.inspector}</p>
//             <p>Signature: ____________________________</p>
//           </div>

//           <button
//             onClick={() => downloadPDF(index)}
//             style={{
//               marginTop: "20px",
//               padding: "10px 20px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               borderRadius: "5px",
//             }}
//           >
//             Download PDF
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VehicleInspectionForm;


import React, { useState, useRef } from "react";
import * as html2pdf from "html2pdf.js";

const sections = {
  "Exterior & Tyres": [
    "Pillar LHS B", "Apron LHS", "Apron RHS", "Apron LHS LEG", "Apron RHS LEG",
    "Firewall", "Cowl Top", "Upper Cross Member (Bonnet Patti)", "Lower Cross Member",
    "Radiator Support", "Head Light Support", "Windshield Front", "Grill",
    "Is the Car Waterlogged?", "RHS Front Tyre", "Roof", "Bonnet/Hood",
    "Dicky Door / Boot Door", "Boot Floor", "Quarter Panel LHS", "Quarter Panel RHS",
    "Fender LHS", "Fender RHS", "Pillar LHS A", "Pillar LHS C", "Pillar RHS C",
    "Pillar RHS B", "Pillar RHS A", "Running Border LHS", "Running Border RHS",
    "Door LHS Front", "Door LHS Rear", "Door RHS Front", "Door RHS Rear",
    "Windshield Rear", "Light LHS Headlight", "Light RHS Headlight",
    "Light LHS Taillight", "Light RHS Taillight", "Bumper Rear", "Bumper Front",
    "ORVM Manual / Electrical LHS", "ORVM Manual / Electrical RHS", "Tyre Spare Tyre",
    "LHS Front Tyre", "LHS Rear Tyre", "RHS Front Tyre", "RHS Rear Tyre"
  ],
  "Engine & Transmission": [
    "Engine", "Exhaust Smoke", "Engine Mounting", "Clutch", "Gear Shifting",
    "Engine Oil Level Dipstik", "Battery", "Coolant", "Sump",
    "Engine Sound", "Engine Oil"
  ],
  "Electricals & Interiors": [
    "2 Power Windows", "Airbag Feature", "Music System", "ABS", "Electrical",
    "Interior", "No. Of Airbags", "No. Of Power Windows", "Fabric Seat",
    "Parking Sensor", "No. Of Airbags 2", "No. Of Power Windows"
  ],
  "Steering, Suspension & Brakes": [
    "Steering", "Brake", "Suspension"
  ],
  "Air Conditioning": [
    "AC Cooling", "Heater"
  ],
  "Other Details": [
    "Chassis Embossing", "RC Availability", "Insurance Image", "Duplicate Key"
  ]
};

const VehicleInspectionForm = () => {
  const initialData = Object.fromEntries(
    Object.values(sections).flat().map((f) => [f, "Yes"])
  );
  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const submissionRefs = useRef([]);
  const [collapsedSections, setCollapsedSections] = useState(
    Object.keys(sections).reduce((acc, section) => ({ ...acc, [section]: false }), {})
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setImages(files);
    setImageDescriptions(Array(files.length).fill(""));
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...imageDescriptions];
    updatedDescriptions[index] = value;
    setImageDescriptions(updatedDescriptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagePreviews = images.map((file) => URL.createObjectURL(file));

    const fullEntry = {
      ...formData,
      images: imagePreviews.map((src, idx) => ({ src, description: imageDescriptions[idx] })),
      date: new Date().toLocaleString(),
      inspector: "Inspector Name",
    };

    setSubmissions((prev) => [...prev, fullEntry]);
    setFormData(initialData);
    setImages([]);
    setImageDescriptions([]);
    e.target.reset();
  };

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const downloadPDF = (index) => {
    const element = submissionRefs.current[index];
    const opt = {
      margin: 0.2,
      filename: `Vehicle-Inspection-Submission-${index + 1}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2>Vehicle Inspection Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(sections).map(([sectionTitle, fields]) => (
          <div key={sectionTitle} style={{ marginBottom: "20px", border: "1px solid #ddd", borderRadius: "10px", padding: "10px" }}>
            <div
              style={{ cursor: "pointer", fontWeight: "bold", fontSize: "16px", backgroundColor: "#f1f1f1", padding: "8px", borderRadius: "6px" }}
              onClick={() => toggleSection(sectionTitle)}
            >
              {collapsedSections[sectionTitle] ? "▶" : "▼"} {sectionTitle}
            </div>
            {!collapsedSections[sectionTitle] && (
              <div style={{ padding: "10px" }}>
                {fields.map((field) => (
                  <div key={field} style={{ marginBottom: "10px" }}>
                    <label style={{ fontWeight: "bold" }}>{field}</label>
                    <select
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      style={{ marginLeft: "10px", padding: "5px" }}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="NA">N/A</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Upload Images (Max 4)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {images.map((file, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>Image {index + 1} Description:</label>
            <input
              type="text"
              value={imageDescriptions[index] || ""}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h3>Submitted Data</h3>
      {submissions.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (submissionRefs.current[index] = el)}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "30px",
            backgroundColor: "#fff",
            fontSize: "14px",
            color: "#333",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h2 style={{ margin: "0", fontSize: "20px" }}>
              Vehicle Inspection Report
            </h2>
            <p style={{ margin: "5px 0" }}>Date: {entry.date}</p>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#eee", textAlign: "left" }}>
                  Parameter
                </th>
                <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "#eee", textAlign: "left" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sections).flatMap(([_, fields]) =>
                fields.map((field) => (
                  <tr key={field}>
                    <td style={{ border: "1px solid #000", padding: "6px" }}>{field}</td>
                    <td style={{ border: "1px solid #000", padding: "6px" }}>{entry[field]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {entry.images && (
            <div>
              <h4>Attached Images</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                {entry.images.map((imgObj, i) => (
                  <div key={i}>
                    <img
                      src={imgObj.src}
                      alt={`Upload ${i}`}
                      style={{ width: "150px", border: "1px solid #ccc" }}
                    />
                    <p style={{ fontSize: "12px", marginTop: "5px" }}>{imgObj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid #999", paddingTop: "10px" }}>
            <p>Inspector: {entry.inspector}</p>
            <p>Signature: ____________________________</p>
          </div>

          <button
            onClick={() => downloadPDF(index)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default VehicleInspectionForm;





