
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
    Object.values(sections).flat().map((f) => [f, ""])
  );

  const [fieldImages, setFieldImages] = useState({});
  const [fieldImageDescriptions, setFieldImageDescriptions] = useState({});

  const [fieldImagesDetail, setFieldImagesDetail] = useState([
    { sectionName: "section1", images: [], description: "" },
    { sectionName: "section2", images: [], description: "" },
    { sectionName: "section3", images: [], description: "" },
    { sectionName: "section4", images: [], description: "" },
    { sectionName: "section5", images: [], description: "" },
    { sectionName: "section6", images: [], description: "" },
  ]);


  const [formData, setFormData] = useState(initialData);
  const [images, setImages] = useState([]);
  const [imageDescriptions, setImageDescriptions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const submissionRefs = useRef([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState(
    Object.keys(sections).reduce((acc, section) => ({ ...acc, [section]: true }), {})
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

  const handleFieldImageChange = (field, file) => {
    setFieldImages((prev) => ({ ...prev, [field]: file }));
  };

  const handleFieldImageDescriptionChange = (field, description) => {
    setFieldImageDescriptions((prev) => ({ ...prev, [field]: description }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const imagePreviews = images.map((file) => URL.createObjectURL(file));

    const extraFieldImages = Object.entries(fieldImages).map(([field, file]) => ({
      field,
      src: URL.createObjectURL(file),
      description: fieldImageDescriptions[field] || "",
    }));

    const fullEntry = {
      ...formData,
      images: imagePreviews.map((src, idx) => ({
        src,
        description: imageDescriptions[idx],
      })),
      extraFieldImages,
      date: new Date().toLocaleString(),
      inspector: "Inspector Name",
    };

    setSubmissions((prev) => [...prev, fullEntry]);
    setFormData(initialData);
    setImages([]);
    setImageDescriptions([]);
    setFieldImages({});
    setFieldImageDescriptions({});
    e.target.reset();
  };


  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const downloadPDF = async (index) => {
    const element = submissionRefs.current[index];

    if (!element) return;

    // Wait a bit to ensure DOM updates (if any)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const opt = {
      margin: 0.2,
      filename: `Vehicle-Inspection-Submission-${index + 1}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true, // Helps load images correctly
        allowTaint: true
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Ensure all images are loaded
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          })
      )
    );

    html2pdf.default().set(opt).from(element).save();

    // Restore the button

  };


  const handleClear = () => {
    // Clear all selections
    setFieldImageDescriptions({}); // Also clear descriptions if needed
    setFormData(initialData);
    setSelectedFields([]);
    setFieldImages({});

  };


  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">Vehicle Inspection Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(sections).map(([sectionTitle, fields]) => (
          <div key={sectionTitle} className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong className="fs-5">{sectionTitle}</strong>
              <select
                className="form-select w-auto"
                onChange={(e) => {
                  const selectedField = e.target.value;
                  if (selectedField && !selectedFields.includes(selectedField)) {
                    setSelectedFields([...selectedFields, selectedField]);
                  }
                }}
              >
                <option value="">Select field to inspect</option>
                {fields.map((field) => (
                  <option
                    key={field}
                    value={field}
                    disabled={selectedFields.includes(field)}
                  >
                    {field}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-body">
              {selectedFields
                .filter((field) => fields.includes(field))
                .map((field) => (
                  <div key={field} className="row g-2 align-items-center mb-3 border-bottom pb-2">
                    {/* Field label */}
                    <div className="col-12 col-md-3">{field}</div>

                    {/* Dropdown */}
                    <div className="col-12 col-md-2">
                      <select
                        className="form-select"
                        value={formData[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {/* If "Yes", show image & description inputs */}
                    {formData[field] === "Yes" && (
                      <>
                        <div className="col-12 col-md-3">
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) =>
                              handleFieldImageChange(field, e.target.files[0])
                            }
                          />
                        </div>
                        <div className="col-12 col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Image description"
                            value={fieldImageDescriptions[field] || ""}
                            onChange={(e) =>
                              handleFieldImageDescriptionChange(field, e.target.value)
                            }
                          />
                        </div>
                      </>
                    )}

                    {/* Remove button */}
                    <div className="col-12 col-md-1 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setSelectedFields(selectedFields.filter((f) => f !== field));
                          const updatedFormData = { ...formData };
                          delete updatedFormData[field];
                          setFormData(updatedFormData);

                          const updatedImageDescriptions = { ...fieldImageDescriptions };
                          delete updatedImageDescriptions[field];
                          setFieldImageDescriptions(updatedImageDescriptions);

                          const updatedImages = { ...fieldImages };
                          delete updatedImages[field];
                          setFieldImages(updatedImages);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        ))}
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary px-4">
            Submit
          </button>
          <button type="button" className="btn btn-warning px-4" onClick={handleClear}>
            Clear
          </button>
        </div>


      </form>


      <hr className="my-5" />

      <h3 className="mb-4">Submitted Data</h3>
      {submissions.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (submissionRefs.current[index] = el)}
          className="border p-4 mb-5 bg-white shadow-sm"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <img src="/logo.png" alt="Logo" style={{ height: "60px" }} className="mb-2" />
            <h2 className="h4 m-0">Vehicle Inspection Report</h2>
            <p className="m-0">Date: {entry.date}</p>
          </div>

          {/* Section-wise Tables */}
          {Object.entries(sections).map(([sectionTitle, fields]) => {
            const perfectCount = fields.filter(field =>
              entry[field] === "No" || entry[field] === "" || entry[field] === undefined
            ).length;
            const imperfectCount = fields.filter(field => entry[field] === "Yes").length;

            return (
              <div key={sectionTitle} className="mb-4 border rounded">
                {/* Section Header */}
                <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top">
                  <div>
                    <h5 className="mb-1">{sectionTitle}</h5>
                    <small>Perfect parts: {perfectCount} | Imperfect parts: {imperfectCount}</small>
                  </div>
                  <div className="fs-4">
                    <i className="bi bi-tools"></i>
                  </div>
                </div>

                {/* Table */}
                <table className="table table-bordered m-0">
                  <thead className="table-light">
                    <tr>
                      <th>Parameters</th>
                      <th className="text-center">Perfect</th>
                      <th className="text-center">Imperfect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field) => {
                      const value = entry[field];
                      const isPerfect = value === "No" || value === "" || value === undefined;
                      const isImperfect = value === "Yes";

                      return (
                        <tr key={field}>
                          <td>{field}</td>
                          <td className="text-center text-success">
                            {isPerfect && <span className="fs-5">✓</span>}
                          </td>
                          <td className="text-center text-danger">
                            {isImperfect && <span className="fs-5">✗</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                

              </div>
            );
          })}

          {/* Attached Images */}
          {entry.images?.length > 0 && (
            <div className="mb-4">
              <h5>Attached Images</h5>
              <div className="row g-3">
                {entry.images.map((imgObj, i) => (
                  <div key={i} className="col-md-3 text-center">
                    <img
                      src={imgObj.src}
                      alt={`Upload ${i}`}
                      className="img-thumbnail"
                      style={{ maxHeight: "150px", objectFit: "cover" }}
                    />
                    <p className="small mt-2">{imgObj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Field-Specific Images */}
          {entry.extraFieldImages?.length > 0 && (
            <div className="mb-4">
              <h5>Field-Specific Images</h5>
              <div className="row g-3">
                {entry.extraFieldImages.map((imgObj, i) => (
                  <div key={i} className="col-md-4 text-center">
                    <img
                      src={imgObj.src}
                      alt={`Field Upload ${i}`}
                      className="img-thumbnail"
                      style={{ maxHeight: "150px", objectFit: "cover" }}
                    />
                    <p className="fw-bold mt-2">{imgObj.field}</p>
                    <p className="small">{imgObj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inspector & Signature */}
          <div className="border-top pt-3">
            <p>Inspector: {entry.inspector}</p>
            <p>Signature: ____________________________</p>
          </div>

          {/* PDF Button */}
          <button
            onClick={() => downloadPDF(index)}
            className="btn btn-success mt-3"
          >
            Download PDF
          </button>
        </div>
      ))}


    </div>

  );
};

export default VehicleInspectionForm;

