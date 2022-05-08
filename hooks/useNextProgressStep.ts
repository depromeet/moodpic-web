import { useSetRecoilState } from 'recoil';
import { progressStepStateAtom } from '@/store/progressStep/atom';

const useNextProgressStep = () => {
  const setNextProgressStep = useSetRecoilState(progressStepStateAtom);
  const nextProgressStep = () => {
    setNextProgressStep((prev) => prev + 1);
  };
  return nextProgressStep;
};

export default useNextProgressStep;
