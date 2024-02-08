import React from "react";

function TableHeader() {
  return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
          <th>ID</th>
        </tr>
      </thead>
    );
}

function TableBody(props) {

    const rows = props.characterData.map((row, index) => {
        return (
            <tr key = {index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick = {() => props.removeCharacter(index)}>
                        Delete
                    </button>
                </td>
                <td>
                    {row._id}
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
        
    );
}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody 
            characterData = {props.characterData}
            removeCharacter = {props.removeCharacter}
            characterId = {props.characterId}
            />
        </table>
    );
}

export default Table;