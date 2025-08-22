import { FaMessage, FaUsers } from 'react-icons/fa6';
import CountCard from "../../ui/statisticsUi/CountCard";
import { hateMessage } from '../../lib/definitions';
import { useEffect, useState } from 'react';
import { GetStatistic } from '../../lib/data';
import Table from '../../components/GTable/Table';
import { Box, Pagination, Typography, CircularProgress } from '@mui/material';

export default function Statistics() {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    handleApi();
  }, [currentPage]);

  const handleApi = async () => {
    setIsLoading(true);
    const StudentData = await GetStatistic
      (currentPage);
    setData(StudentData.data);
    setTotalPages(StudentData.pagination.last_page);
    setIsLoading(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={10} px={10} py={20}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div
            className="flex justify-around h-72 -mt-12 z-50 relative gap-6 w-full"
          >
            <CountCard title="الطلاب" count={Data.countStudent} Icon={FaUsers} />
            <CountCard title="الطلاب  المسجلين" count={Data.countVerifiedStudent} Icon={FaUsers} />
            <CountCard title="الطلاب غير المسجلين" count={Data.countNotVerifiedStudent} Icon={FaUsers} />
            <CountCard title="رسائل الكراهية " count={Data.countHateMessage} Icon={FaMessage} />
          </div>

          <Typography
            variant="h4"
            fontWeight="bold"
            className='w-full text-center'
            sx={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)' }}
          >
            رسائل الكراهية
          </Typography>

          <Table
            headers={hateMessage}
            rows={Data.hateMessages}
          />

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              dir="ltr"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </div>
  );
}
