import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; 
import upload_icon from '../../assets/upload.svg'


export default function (props){

    const selectedFile = props.selectedFile
    const setSelectedFile = props.setSelectedFile
    const fileSelected = props.fileSelected
    const setFileSelected = props.setFileSelected
    const setExcelData = props.setExcelData || null

    useEffect(() => {
        if (selectedFile) {
          // Do something with the selected file
          console.log(selectedFile, '...selectedFile')
        }
    }, [selectedFile, fileSelected])

    const fileInputRef = useRef(null);

        const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        // Check if the selected file is an Excel file (xlsx format)
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
           
          // Check if the uploaded Excel file contains data 
           const reader = new FileReader();
           reader.onload = (e) => {
             const data = new Uint8Array(e.target.result);
             const workbook = XLSX.read(data, { type: 'array' });
             const sheetName = workbook.SheetNames[0];
             const sheet = workbook.Sheets[sheetName];
     
             //check if sheet has values... develop this logic
             if (sheet && sheet['A1'] && sheet['A1'].v) {
               // Sheet has values, you can proceed with processing
               setSelectedFile(file);
               setFileSelected(true);
               const excelData = XLSX.utils.sheet_to_json(sheet);
               if(setExcelData){
                setExcelData(excelData)
                console.log(excelData, '...excelData')
               }
             } else {
               // Sheet is empty or not valid
               setSelectedFile(null);
               console.error('Uploaded Excel sheet is empty or not valid.');
               alert('Uploaded Excel sheet is empty or not valid.')
             }
           };
           reader.readAsArrayBuffer(file);
        } else {
          setSelectedFile(null);
          setFileSelected(false);
          console.error('Please select a valid Excel file (.xlsx).');
          alert('Please select a valid Excel file')
        }
        };
    
        const handleUpload = () => {
            if (fileInputRef.current) {
            fileInputRef.current.click();
            }
        };

        const handleDrop = (event) => {
            event.preventDefault();
            const droppedFile = event.dataTransfer.files[0];
            // Check if the dropped file is an Excel file (xlsx format)
            if (droppedFile && droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        
            // Check if the uploaded Excel file contains data 
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
        
                if (sheet && sheet['A1'] && sheet['A1'].v) {
                // Sheet has values, you can proceed with processing
                setSelectedFile(droppedFile);
                setFileSelected(true);
                } else {
                // Sheet is empty or not valid
                setSelectedFile(null);
                console.error('Uploaded Excel sheet is empty or not valid.');
                }
            };
            reader.readAsArrayBuffer(droppedFile);
            } else {
            setSelectedFile(null);
            setFileSelected(false);
            console.error('Please drop a valid Excel file (.xlsx).');
            alert('Please drop a valid Excel file')
            }
        };
    
        const handleDragOver = (event) => {
            event.preventDefault();
        };

    return(<>
        <div 
              className="rounded-md bg-whitesmoke box-border h-[153px] flex flex-row items-center justify-start py-2 px-6 text-center text-dimgray border-[1px] border-dashed border-darkgray"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div 
                  className="w-[355px] flex flex-col items-center justify-center gap-[16px]"
                  onClick={handleUpload}
              >
                <img
                  className="relative w-6 h-6 overflow-hidden shrink-0"
                  alt=""
                  src={upload_icon}
                />
                <div className="relative tracking-[-0.04em] inline-block w-[229px]">
                  <span>{`Drag and drop or `}</span>
                  <span 
                    className="[text-decoration:underline] text-blueviolet cursor-pointer"
                  >
                    Browse
                  </span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".xlsx" // Specify the accepted file type (Excel files)
              />
            </div>
    </>)
}