import { useHanoi } from '@/zustand';
import { useShallow } from 'zustand/react/shallow';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { Rod } from './rod';

const rods = ['A', 'B', 'C'];

const Graph = () => {
  const [selectedStepIndex, data] = useHanoi(
    useShallow((state) => [state.selectedStepIndex, state.data])
  );
  const steps = data?.steps || [];

  if (selectedStepIndex === undefined) return null;

  const selectedStep =
    selectedStepIndex !== undefined ? steps[selectedStepIndex] : undefined;

  if (!selectedStep) return null;

  const { actionTaken, diskElements } = selectedStep;

  const groupedByRod = rods.reduce((acc, rod) => {
    // @ts-ignore
    acc[rod] = [];
    return acc;
  }, {});

  diskElements.forEach((disk) => {
    // @ts-ignore
    groupedByRod[disk.rod].push(disk);
  });

  return (
    <Card className="flex flex-col gap-2 h-full p-2 overflow-hidden">
      <CardHeader>
        <CardTitle>{`Step #${selectedStep.stepNumber.toLocaleString()}`}</CardTitle>
        <CardDescription>{actionTaken}</CardDescription>
      </CardHeader>
      <CardContent className="h-[500px] overflow-hidden flex justify-evenly items-end">
        <Rod
          label="A"
          disks={diskElements.filter((d) => d.rod === 'A')}
          totalDiskCount={diskElements.length}
        />
        <Rod
          label="B"
          disks={diskElements.filter((d) => d.rod === 'B')}
          totalDiskCount={diskElements.length}
        />
        <Rod
          label="C"
          disks={diskElements.filter((d) => d.rod === 'C')}
          totalDiskCount={diskElements.length}
        />
      </CardContent>
    </Card>
  );
};

export default Graph;
