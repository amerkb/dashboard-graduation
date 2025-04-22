import { Box, Checkbox, CircularProgress, FormControlLabel, Pagination, Typography } from "@mui/material";
import Table from "../.././components/GTable/Table";
import { requestJoinColumns } from "../.././lib/definitions";
import { useEffect, useState } from "react";
import { GetDataStudent } from "../.././lib/data";
import { updateCheckStudentForm } from "../.././lib/actions";

export default function Students() {
    const [Student, setStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        handleApi();
    }, [currentPage]);

    const handleApi = async () => {
        setIsLoading(true);
        const StudentData = await GetDataStudent(currentPage);
        setStudent(StudentData.data);
        setTotalPages(StudentData.pagination.last_page);
        setIsLoading(false);
    };

    const handleCheckboxChange = async (index) => {
        setStudent((prevBrands) =>
            prevBrands.map((brand) =>
                brand.id == index ? { ...brand, verified: !brand.verified } : brand
            )
        );

        await updateCheckStudentForm(index);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)" }}
            >
                الطلاب
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" my={10} p={10}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Table
                        headers={requestJoinColumns}
                        rows={Student}
                        rowKey="name"
                        action={(row) => (
                            <Box display="flex" justifyContent="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={row.verified}
                                            onClick={() => handleCheckboxChange(row.id)}
                                        />
                                    }
                                    label="تأكيد"
                                />
                            </Box>
                        )}
                    />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            dir="ltr"
                            shape="circular"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}