import React, { useState, useEffect } from "react";
import axiosWithAuth  from './AxiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const quotesURL = 'http://localhost:5000/api/colors';


const ColorList = ({ colors, updateColors, getColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  useEffect(() => {
    const id = colorToEdit.id;
    const colorUpdate = colors.find(color => {
      return `${color.id}` === id
    })
    if (colorUpdate) {
      setColorToEdit(colorUpdate)
    }
  }, [colorToEdit.id, colors])

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    axiosWithAuth()
    .put(`${quotesURL}/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      getColors();
      setEditing(false)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`${quotesURL}/${color.id}`)
    .then(res => {
      getColors();
      setEditing(false)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
