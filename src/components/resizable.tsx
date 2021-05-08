import { ResizableBox } from 'react-resizable';
import './resizeable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox
      width={Infinity}
      height={300}
      resizeHandles={['s']}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 35]}>
      {children}
    </ResizableBox>
  );
};
