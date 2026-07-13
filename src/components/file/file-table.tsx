import React from "react";
import "./file-table.scss";
import { formatDate } from "../../handler/date-handler";

/**
 *
 * @param fileDetails
 * @returns
 */
const FileTable = (props: any) => {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + " B";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    } else {
      return (bytes / 1024 / 1024).toFixed(1) + " MB";
    }
  };

  return (
    <div>
      <h3>Files</h3>

      {props.files.length === 0 && <p>No files yet!</p>}

      {props.files.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>File Name</th>
              <th>Size</th>
              <th>Uploaded Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.files.map((file: any) => (
              <tr key={file.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={props.selectedFiles.includes(file.id)}
                    onChange={() => props.onSelect(file.id)}
                  />
                </td>
                <td>{file.name}</td>
                <td>{formatSize(file.size)}</td>
                <td>{formatDate(file.uploaded_at)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => props.onDelete(file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileTable;
