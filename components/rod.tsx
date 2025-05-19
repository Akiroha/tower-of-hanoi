import { DiskElementType } from '@/types';

export const Rod = ({
  label,
  disks,
  totalDiskCount,
}: {
  label: string;
  disks: DiskElementType[];
  totalDiskCount: number;
}) => {
  const sorted = [...disks].sort((a, b) => a.position - b.position);

  // Calculate height per disk
  const diskHeight = Math.min(16, 400 / totalDiskCount); // clamp max height
  const showLabels = diskHeight >= 10;

  // Calculate width per disk
  const diskWidthMultiplier =
    totalDiskCount <= 10 ? 25 : totalDiskCount <= 25 ? 15 : 10;

  return (
    <div className="flex flex-col justify-end items-center flex-1 h-full relative px-2">
      {/* Disks */}
      {sorted.map((disk) => (
        <div
          key={disk.size}
          className="rounded-full text-white flex items-center justify-center mb-[1px] z-10"
          style={{
            height: `${diskHeight}px`,
            width: `${disk.size * diskWidthMultiplier}px`,
            backgroundColor: `hsl(${disk.size * 40}, 80%, 50%)`,
            fontSize: `${diskHeight * 0.8}px`,
          }}
        >
          {showLabels ? disk.size : null}
        </div>
      ))}

      {/* Label below rod */}
      <span className="mt-2 text-sm font-bold text-white">{label}</span>
    </div>
  );
};
