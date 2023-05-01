import { SectionMain } from '@components/Templates/SectionMain';
import { Header } from '@components/Organisms/Header';
import React from 'react';
import MapAppointment from '@features/map/MapAppointment';

const Test = () => {
  return (
    <>
      <SectionMain />
      <MapAppointment />
    </>
  );
};
export default Test;
