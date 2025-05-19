import useHanoi from '@/zustand/hanoi-store';
import { useShallow } from 'zustand/react/shallow';
import axios from 'axios';
import { toast } from 'sonner';

const useSolve = () => {
  const [setData, setLoading, setSelectedStepIndex] = useHanoi(
    useShallow((state) => [
      state.setData,
      state.setLoading,
      state.setSelectedStepIndex,
    ])
  );

  const hitApi = async (diskNumber: number, pageIndex: number) => {
    setSelectedStepIndex(undefined);
    setData(undefined);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/solve-toh`,
        {
          diskNumber,
          pageIndex,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.log('error: ', error);
      toast.error(JSON.stringify(error));
    }
    setLoading(false);
  };

  return {
    hitApi,
  };
};

export default useSolve;
