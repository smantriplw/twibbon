import React from "react";

export type TwibbonCanvasProps = {
    canvasid: string;
    width: number;
    height: number;
    hidden?: boolean;
}

export const CanvasTwibbon = React.forwardRef<HTMLCanvasElement, TwibbonCanvasProps>((props, ref) => {
    return (
        <canvas id={props.canvasid} {...props} ref={ref} />
    )
});
