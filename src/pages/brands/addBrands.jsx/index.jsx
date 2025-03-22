import { Box, Checkbox, FormControlLabel, Pagination, Typography } from "@mui/material";
import Table from "../../../components/GTable/Table";
import { requestJoinColumns } from "../../../lib/definitions";
import { useEffect, useState } from "react";
import { GetBrands } from "../../../lib/data";


export default function Offers() {
    const [brandsData, setBrandsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const tableRows = [
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
        { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    ];
    useEffect(() => {
        handleApi();
    }, [])

    const handleApi = async () => {
        setIsLoading(true);
        const brandData = await GetBrands();
        setBrandsData([]);
        brandData.map((e) => setBrandsData((prev) => [...prev, e]));
        setIsLoading(false);
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
            <Table
                headers={requestJoinColumns}
                rows={tableRows}
                rowKey="name"
                action={(row) =>
                    <Box isplay="flex" justifyContent="center">
                        <FormControlLabel control={<Checkbox defaultChecked />} label="تأكيد" />
                    </Box>}
            />

            <Box display="flex" justifyContent="center">
                <Pagination count={10} variant="outlined" dir="ltr" shape="circular" />
            </Box>
        </Box>

    );
};