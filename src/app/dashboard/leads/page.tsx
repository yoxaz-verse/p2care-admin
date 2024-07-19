"use client";
import React, { useState } from 'react';
import Title from '@/components/titles';
import { generateTabColumns } from '@/app/content/table-columns';
import generateData from '@/app/content/tableData';
import ViewModal from '@/components/Modals/ViewModal';
import TabComponent from '@/components/TabComponent';
import { generateTable, TabsNames, TableHeadings } from '@/utilis/content';
import { Card, CardBody, Tab, Tabs, useDisclosure } from '@nextui-org/react';

const Leads = () => {
  const [currentPage, setCurrentpage] = useState<number>(1);
  const handlePagination = (page: number) => {
    setCurrentpage(page + 1);
  };

  const [data, setData] = useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex flex-col w-full'>
        <Title title='Leads' />
        <div className='flex w-full gap-4 flex-col'>
          <div className='flex flex-col'>
            {TableHeadings.map((t: string) => (
              <div key={t} className='mb-4'>
                {t === 'Doctors' ? (
                  <>
                    <Title title={t} />
                    <h1 className='text-[24px] font-semibold'>Enquries</h1>
                    <Tabs color='primary' aria-label='Options'>
                      {TabsNames.map((tab: string, index: number) => (
                        <Tab key={tab} title={<h3 className='text-[15px]'>{tab}</h3>} value={tab}>
                          <div className='w-full'>
                            <h3 className='text-[20px] font-bold'>{tab}</h3>
                            {generateTable({
                              isSuccess: true,
                              columns: generateTabColumns({ onView: onOpen, tableName: t, type: tab, setData: setData }),
                              currentPage: currentPage,
                              onPageChange: (currentPage) => handlePagination(currentPage),
                              tableData: generateData({ tableName: t }),
                              isLoading: false,
                              totalItems: generateData({ tableName: t }).length,
                              isError: false
                            })}
                          </div>
                        </Tab>
                      ))}
                    </Tabs>
                    <h1 className='text-[24px] font-semibold'>Consulation</h1>
                    <Tabs color='primary' aria-label='Options'>
                      {TabsNames.map((tab: string, index: number) => (
                        <Tab key={tab} title={<h3 className='text-[15px]'>{tab}</h3>} value={tab}>
                          <div className='w-full'>
                            <h3 className='text-[20px] font-bold'>{tab}</h3>
                            {generateTable({
                              isSuccess: true,
                              columns: generateTabColumns({ onView: onOpen, tableName: "Consulation", type: tab, setData: setData }),
                              currentPage: currentPage,
                              onPageChange: (currentPage) => handlePagination(currentPage),
                              tableData: generateData({ tableName: "Consulation" }),
                              isLoading: false,
                              totalItems: generateData({ tableName: "Consulation" }).length,
                              isError: false
                            })}
                          </div>
                        </Tab>
                      ))}
                    </Tabs>

                  </>
                ) : (
                  <>
                    <Title title={t} />
                    <Tabs color='primary' aria-label='Options'>
                      {TabsNames.map((tab: string) => (
                        <Tab key={tab} title={<h3 className='text-[15px]'>{tab}</h3>} value={tab}>
                          <div className='w-full'>
                            <h3 className='text-[20px] font-bold'>{tab}</h3>
                            {generateTable({
                              isSuccess: true,
                              columns: generateTabColumns({ onView: onOpen, tableName: t, type: tab, setData: setData }),
                              currentPage: currentPage,
                              onPageChange: (currentPage) => handlePagination(currentPage),
                              tableData: generateData({ tableName: t }),
                              isLoading: false,
                              totalItems: generateData({ tableName: t }).length,
                              isError: false
                            })}
                          </div>
                        </Tab>
                      ))}
                    </Tabs>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leads;
