import { useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useHanoi } from '@/zustand';
import { useShallow } from 'zustand/react/shallow';
import { useSolve } from '@/hooks';

const Controller = () => {
  const inputRef = useRef(null);

  const [loading, data, setDiskNumber, setPageIndex] = useHanoi(
    useShallow((state) => [
      state.loading,
      state.data,
      state.setDiskNumber,
      state.setPageIndex,
    ])
  );

  const { hitApi } = useSolve();

  const handleSubmit = async () => {
    //   @ts-ignore
    const diskNumber = parseInt(inputRef?.current?.value, 10);

    if (!diskNumber || diskNumber === 0) {
      toast.error(`A value is required.`);
      return;
    }

    if (diskNumber > 50) {
      toast.error(`Input cannot be greater than 50.`);
      return;
    }

    setPageIndex(0);
    setDiskNumber(diskNumber);
    hitApi(diskNumber, 0);
  };

  const solutionStepCount = data?.solutionStepCount || 0;

  return (
    <form className="flex gap-2">
      <div className="flex flex-col gap-2">
        <Input placeholder="Enter Disk Number" type="number" ref={inputRef} />
        {solutionStepCount > 0 && (
          <div className="font-bold text-sm">
            Steps to solve: {solutionStepCount.toLocaleString()}
          </div>
        )}
      </div>
      <Button disabled={loading} onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default Controller;
