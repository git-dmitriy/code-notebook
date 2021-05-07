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
    <ResizableBox width={Infinity} height={300} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};
