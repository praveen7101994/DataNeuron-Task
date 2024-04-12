import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import axios from "axios";
import "./App.css";

const App = () => {
  const [topWidth, setTopWidth] = useState("50%");
  const [bottomHeight, setBottomHeight] = useState("250px");
  const [leftWidth, setLeftWidth] = useState("30%");
  const [rightWidth, setRightWidth] = useState("70%");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTopResize = (e, direction, ref, d) => {
    setTopWidth(`${parseInt(topWidth) + d.width}px`);
  };

  const handleBottomResize = (e, direction, ref, d) => {
    setBottomHeight(`${parseInt(bottomHeight) + d.height}px`);
  };

  const handleLeftResize = (e, direction, ref, d) => {
    setLeftWidth(`${parseInt(leftWidth) + d.width}px`);
  };

  const handleRightResize = (e, direction, ref, d) => {
    setRightWidth(`${parseInt(rightWidth) + d.width}px`);
  };

  const handleInputChange = (event) => {
    // Destructure event.target to get name and value
    const { name, value } = event.target;

    // Update the form data state with the new value
    setFormData({
      ...formData,
      [name]: value, // Update only the field that has changed
    });
  };

  const handleAdd = async () => {
    try {
      const resp = await axios.post("/user", formData);
      alert(`${resp.data.msg}`);
    } catch (error) {
      alert("something went wrong");
    }
  };

  const handleUpdate = async () => {
    try {
      const resp = await axios.put("/user", formData);
      alert(`${resp.data.msg}`);
    } catch (error) {
      alert("something went wrong");
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Resizable
        id="top-container"
        style={{ flex: "1", display: "flex" }}
        size={{ width: "100%", height: topWidth }}
        onResizeStop={handleTopResize}
      >
        <Resizable
          style={{ flex: "1", backgroundColor: "lightblue" }}
          size={{ width: leftWidth, height: "100%" }}
          onResizeStop={handleLeftResize}
        >
          Left Section
        </Resizable>
        <Resizable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgreen",
          }}
          size={{ width: rightWidth, height: "100%" }}
          onResizeStop={handleRightResize}
        >
          <div className="form-container">
            <input
              onChange={handleInputChange}
              value={formData.name}
              className="form-input"
              type="text"
              placeholder="name"
              name="name"
            />
            <input
              onChange={handleInputChange}
              value={formData.email}
              className="form-input"
              type="text"
              placeholder="email"
              name="email"
            />
            <input
              onChange={handleInputChange}
              value={formData.password}
              className="form-input"
              type="password"
              placeholder="password"
              name="password"
            />
            <div className="form-action">
              <button className="btn" onClick={handleAdd}>
                Add
              </button>
              <button className="btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </Resizable>
      </Resizable>
      <Resizable
        style={{ backgroundColor: "lightcoral" }}
        size={{ width: "100%", height: bottomHeight }}
        onResizeStop={handleBottomResize}
      >
        Bottom Section
      </Resizable>
    </div>
  );
};

export default App;
