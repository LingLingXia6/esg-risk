import React from 'react';
import Head from 'next/head';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Container } from '@chakra-ui/react';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import Incidents from '@/components/Incidents/Incidents';
import CriticalIncidents from '@/components/CriticalIncidents/CriticalIncidents';
import styles from './index.module.scss';

const TITLE_KEY: Record<string, string> = {
  dashboard: 'Dashboard Overview',
  incident: 'Incident Monitoring',
  critical: 'Critical Incidents'
};

const CONTENT_KEY: Record<string, React.ReactNode> = {
  dashboard: <DashboardOverview />,
  incident: <Incidents />,
  critical: <CriticalIncidents />
};

export default function Home() {
  return (
    <>
      <Head>
        <title>ESG Risk Dashboard</title>
        <meta
          name="description"
          content="ESG Risk Assessment System - Comprehensive analysis of Environmental, Social, and Governance risks"
        />
      </Head>

      <Box className={styles['dashboard-container']}>
        <Container maxW="container.xl">
          <Box className={styles['header-container']}>
            <Heading as="h1" className={styles['dashboard-title']}>
              ESG Risk Dashboard
            </Heading>
          </Box>
          <Box className={styles['content-container']}>
            <Tabs variant="unstyled" colorScheme="blue" isLazy className={styles['tabs-container']}>
              <TabList className={styles['tab-list']}>
                {Object.keys(TITLE_KEY).map(key => (
                  <Tab
                    key={key}
                    className={styles['tab']}
                    _selected={{ className: `${styles.tab} ${styles.selected}` }}
                  >
                    {TITLE_KEY[key]}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {Object.keys(CONTENT_KEY).map(key => {
                  return (
                    <TabPanel padding={0} key={key}>
                      {CONTENT_KEY[key]}
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
}
