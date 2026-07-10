import React, { useState } from 'react';
import './file-upload.scss';

const FileUpload = (props: any) => {

  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {return;}
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /** Handle Drag and drop Files
   * @param void
   */

  const handleDrop = (e:any) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  /** Handle Upload files
   * @param void
   */

  const handleUpload = () => {
    setIsUploading(true);
    setProgress(0);

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress = currentProgress + 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);

        selectedFiles.forEach((file) => {
          const newFile = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            uploadedDate: new Date().toLocaleDateString()
          };
          props.onUpload(newFile);
        });

        setSelectedFiles([]);
        setProgress(0);
      }
    }, 300);
  };

  return (
    <div>
      <h3>Upload Files</h3>

      <div className="upload_box" onDragOver={handleDragOver} onDrop={handleDrop}>
        <p>Drag and drop files here</p>
        <p>OR</p>
        <input type="file" multiple onChange={handleFileSelect} />
      </div>

      {selectedFiles.length > 0 && (
        <div>
          <h4>Selected Files:</h4>
          <ul className="selected_files_list">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>

          <button className="upload_btn" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}

      {isUploading && (
        <div className="progress_outer">
          <div className="progress_inner" style={{ width: progress + '%' }}></div>
          <p>{progress}%</p>
        </div>
      )}

    </div>
  );
};

export default FileUpload;