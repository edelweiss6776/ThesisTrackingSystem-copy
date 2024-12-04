import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const UploadThesisModal: React.FC<{ onClose: () => void; onSubmit: (data: any) => void }> = ({
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        ABSTRACT: "",
        AUTHOR: "",
        COLLEGE_DEPT: "",
        PDF_FILE: null as File | null,
        THESIS_NO: "",
        THESIS_TITLE: "",
        TYPE: "",
        YEAR: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({ ...formData, PDF_FILE: file });
    };

    const handleSubmit = () => {
        if (!formData.PDF_FILE) {
            alert("Please select a PDF file.");
            return;
        }
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    width: "500px",
                    margin: "auto",
                    marginTop: "100px",
                    padding: "20px",
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                    Upload Thesis
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField label="Abstract" name="ABSTRACT" onChange={handleInputChange} />
                    <TextField label="Author" name="AUTHOR" onChange={handleInputChange} />
                    <TextField label="College/Dept" name="COLLEGE_DEPT" onChange={handleInputChange} />
                    <TextField label="Thesis Number" name="THESIS_NO" onChange={handleInputChange} />
                    <TextField label="Thesis Title" name="THESIS_TITLE" onChange={handleInputChange} />
                    <TextField label="Type" name="TYPE" onChange={handleInputChange} />
                    <TextField label="Year" name="YEAR" onChange={handleInputChange} />
                    <Button variant="contained" component="label">
                        Upload PDF
                        <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadThesisModal;
