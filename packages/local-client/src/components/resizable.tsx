import {ResizableBox, ResizableBoxProps} from 'react-resizable';
import {useEffect, useState, type ReactNode} from 'react';
import './resizeable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children: ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({
                                                        direction,
                                                        children,
                                                    }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if (window.innerWidth < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };

        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [width]);

    let resizableProps: ResizableBoxProps;

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            width,
            height: Infinity,
            resizeHandles: ['e'],
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            onResizeStop: (_event, data) => {
                setWidth(data.size.width);
            },
        };
    } else {
        resizableProps = {
            width: Infinity,
            height: 300,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 35],
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
