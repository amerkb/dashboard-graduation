import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleTable from './ScheduleTable';

export default function WorkScheduleTable({
  data = {},
  onEdit = () => {},
  onSave = () => {},
}) {
  const [tabsState, setTabsState] = React.useState({});

  if (!data || typeof data !== 'object') return null;

  const handleTabChange = (yearKey) => (_e, idx) => {
    setTabsState((prev) => ({ ...prev, [yearKey]: idx }));
  };

  return (
    <Box>
      {Object.entries(data).map(([yearKey, items]) => (
        <Accordion key={yearKey} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{yearKey}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Array.isArray(items) ? (
              <ScheduleTable items={items} onEdit={onEdit} onSave={onSave} />
            ) : (
              <>
                <Tabs
                  value={tabsState[yearKey] || 0}
                  onChange={handleTabChange(yearKey)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  {Object.keys(items).map((spec) => (
                    <Tab key={spec} label={spec} />
                  ))}
                </Tabs>
                {Object.entries(items).map(([spec, arr], idx) => (
                  <div key={spec} hidden={tabsState[yearKey] !== idx}>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Typography variant="subtitle1">{spec}</Typography>
                    </Box>
                    <ScheduleTable
                      items={arr}
                      onEdit={onEdit}
                      onSave={onSave}
                    />
                  </div>
                ))}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
