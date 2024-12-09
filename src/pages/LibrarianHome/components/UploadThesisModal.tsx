import React, { useState, useCallback } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    CircularProgress,
    Alert,
    IconButton,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";

interface UploadThesisModalProps {
    onClose: () => void;
    onSubmit: (data: FormData) => Promise<void>;
}

interface FormDataState {
    ABSTRACT: string;
    AUTHOR: string;
    COLLEGE_DEPT: string;
    THESIS_TITLE: string;
    TYPE: string;
    YEAR: string;
    PDF_FILE: File | null;
}

const UploadThesisModal: React.FC<UploadThesisModalProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState<FormDataState>({
        ABSTRACT: "",
        AUTHOR: "",
        COLLEGE_DEPT: "",
        THESIS_TITLE: "",
        TYPE: "",
        YEAR: "",
        PDF_FILE: null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState("");
    const [submissionError, setSubmissionError] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState("");

    const validate = useCallback(() => {
        const newErrors: Record<string, string> = {};
        if (!formData.ABSTRACT.trim()) newErrors.ABSTRACT = "Abstract is required.";
        if (!formData.AUTHOR.trim()) newErrors.AUTHOR = "Author is required.";
        if (!formData.COLLEGE_DEPT.trim()) newErrors.COLLEGE_DEPT = "College/Department is required.";
        if (!formData.THESIS_TITLE.trim()) newErrors.THESIS_TITLE = "Thesis Title is required.";
        if (!formData.TYPE.trim()) newErrors.TYPE = "Type is required.";
        if (!/^\d{4}$/.test(formData.YEAR)) newErrors.YEAR = "Year must be a valid 4-digit number.";
        if (!formData.PDF_FILE) newErrors.PDF_FILE = "PDF file is required.";
        else if (formData.PDF_FILE.size > 5 * 1024 * 1024)
            newErrors.PDF_FILE = "PDF file size must be less than 5MB.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        },
        [formData]
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
                setFormData({ ...formData, PDF_FILE: file });
                setFileName(file.name);
            }
        },
        [formData]
    );

    const handleSubmit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        setSubmissionError("");
        setSubmissionSuccess("");

        try {
            const thesisNo = uuidv4();
            const dataToSubmit = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "PDF_FILE" && value) {
                    dataToSubmit.append(key, value as File);
                } else {
                    dataToSubmit.append(key, value as string);
                }
            });
            dataToSubmit.append("THESIS_NO", thesisNo);

            await onSubmit(dataToSubmit);
            setSubmissionSuccess("Thesis uploaded successfully!");
            setFormData({
                ABSTRACT: "",
                AUTHOR: "",
                COLLEGE_DEPT: "",
                THESIS_TITLE: "",
                TYPE: "",
                YEAR: "",
                PDF_FILE: null,
            });
            setFileName("");
        } catch (error) {
            setSubmissionError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="upload-thesis-title"
            aria-describedby="upload-thesis-description"
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    width: "90%",
                    maxWidth: "500px",
                    margin: "auto",
                    marginTop: "10%",
                    padding: "20px",
                    boxShadow: 24,
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" id="upload-thesis-title" sx={{ marginBottom: "20px" }}>
                    Upload Thesis
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {[
                        { label: "Abstract", name: "ABSTRACT" },
                        { label: "Author", name: "AUTHOR" },
                        { label: "College/Department", name: "COLLEGE_DEPT" },
                        { label: "Thesis Title", name: "THESIS_TITLE" },
                        { label: "Type", name: "TYPE" },
                        { label: "Year", name: "YEAR" },
                    ].map(({ label, name }) => (
                        <TextField
                            key={name}
                            label={label}
                            name={name}
                            value={formData[name as keyof FormDataState]}
                            onChange={handleInputChange}
                            error={!!errors[name]}
                            helperText={errors[name]}
                            fullWidth
                        />
                    ))}
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        Upload PDF
                        <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
                    </Button>
                    {fileName && <Typography>Uploaded: {fileName}</Typography>}
                    {errors.PDF_FILE && <Typography color="error">{errors.PDF_FILE}</Typography>}
                    {submissionError && <Alert severity="error">{submissionError}</Alert>}
                    {submissionSuccess && <Alert severity="success">{submissionSuccess}</Alert>}
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        sx={{ marginTop: "15px" }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadThesisModal;
