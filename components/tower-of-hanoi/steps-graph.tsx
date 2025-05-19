import { useHanoi } from '@/zustand';
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '../ui/skeleton';
import Graph from '../graph';
import StepsTable from './steps-table';

const twinColsRowsClassSelected = `grow-0 w-[100%] h-[60%]`;

const StepsGraph = () => {
  const [loading, data, selectedStepIndex] = useHanoi(
    useShallow((state) => [state.loading, state.data, state.selectedStepIndex])
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full h-12 rounded-xl shadow" />
          </div>
        ))}
      </div>
    );
  }

  const steps = data?.steps || [];

  if (steps.length === 0) return null;

  const selectedStepClass = `grow-0 overflow-y-auto ${Number(selectedStepIndex) >= 0 ? twinColsRowsClassSelected : 'display-none'}`;

  return (
    <div className="h-full flex flex-col gap-5">
      <StepsTable data={steps} />
      <div className={selectedStepClass}>
        <Graph />
      </div>
    </div>
  );
};

export default StepsGraph;
