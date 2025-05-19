'use client';

import * as React from 'react';
import Controller from './controller';
import StepsGraph from './steps-graph';

const TowerOfHanoi = () => {
  return (
    <div className="h-full flex w-full flex-col gap-5 overflow-hidden">
      <Controller />
      <StepsGraph />
    </div>
  );
};

export default TowerOfHanoi;
