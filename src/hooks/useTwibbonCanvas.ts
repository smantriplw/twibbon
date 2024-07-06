import * as fabric from 'fabric';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export type UseTwibbonHookRes = {
    fabricCanvas?: fabric.Canvas;
    canvasRef: React.Ref<HTMLCanvasElement>;

    addFrame: (frameUrl: string) => void;
    addBackground: (twibbonUrl: string) => void;
    recommendedSize: {
        height: number;
        width: number;
    };
    toDataUrl: () => string | undefined;
    setScaled: React.Dispatch<React.SetStateAction<number>>;
    scaledNumber: number;
}

export const useTwibbonCanvas = (): UseTwibbonHookRes => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [frameUrl, setFrameUrl] = React.useState<string>();
    const [lastTwb, setLastTwb] = React.useState<string>();
    const [scaled, setScaled] = React.useState<number>(0.5);

    const [recommendedSize, setRecommendedSize] = React.useState<{
        height: number;
        width: number;
    }>({
        height: 500,
        width: 500,
    });

    const [fabricCanvas, setFabricCanvas] = React.useState<fabric.Canvas>();
    const isMd = useMediaQuery({
        query: '(min-width: 768px)',
    });

    const oldFabricObject = fabric.FabricObject.prototype.toObject;
    fabric.FabricObject.prototype.toObject = function(additionalProps) {
        return oldFabricObject.call(this, ['name'].concat(additionalProps!));
    }

    const addBackgroundTwibbon = (twibbonUrl: string, isBlur = false) => {
        const prevId = 'twibbon_background';
        // removeFabricObject(prevId);

        fabric.FabricImage.fromURL(twibbonUrl, {
            crossOrigin: 'anonymous',
        }, {
            hasControls: false,
            hasBorders: false,
            objectCaching: false,
            selectable: false,
            evented: false,
            lockMovementX: false,
            lockMovementY: false,
        }).then(twibbonImage => {
            twibbonImage.scaleToHeight(fabricCanvas?.getHeight() ?? 0);
            twibbonImage.scaleToWidth(fabricCanvas?.getWidth() ?? 0);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (twibbonImage as any).name = prevId;
            setFrameUrl(twibbonUrl);

            twibbonImage.centeredScaling = true;
            twibbonImage.centeredRotation = true;
            twibbonImage.setControlsVisibility({
                    tr: !1,
                    tl: !1,
                    br: !1,
                    bl: !1,
                    mtr: !1,
                    mr: !1,
                    mt: !1,
                    mb: !1,
                    ml: !1,
                    deleteControl: !1
            });
            if (isBlur) {
                twibbonImage.filters = twibbonImage.filters.concat([
                    new fabric.filters.Blur({
                        blur: .5,
                    }),
                ]);

                twibbonImage.applyFilters();
            }

            fabricCanvas?.insertAt(0, twibbonImage);
        });
    }

    const removeFabricObject = (objectName: string): void => {
        for (const obj of fabricCanvas?.getObjects() ?? []) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((obj as any).name === objectName) {
                console.log(objectName, 'removed');
                fabricCanvas?.remove(obj);
            }
        }
    }

    const addFrameTwibbon = (frameUrl: string) => {
        fabric.FabricImage.fromURL(frameUrl, {
            crossOrigin: 'anonymous',
        }, {
            hasControls: true,
            hasBorders: false,
            centeredRotation: true,
            centeredScaling: true,
            objectCaching: false,
            originX: 'center',
            originY: 'center',
            absolutePositioned: true,
        }).then(frameImage => {
            const prevId = 'twibbon_frame';

            frameImage.scaleToHeight(fabricCanvas?.getHeight()   ?? 0);
            frameImage.scaleToWidth(fabricCanvas?.getWidth() ?? 0);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (frameImage as any).name = prevId;
            setLastTwb(frameUrl);

            frameImage.centeredRotation = true;
            frameImage.centeredScaling = true;
            frameImage.setControlsVisibility({
                tr: !1,
                tl: !1,
                br: !1,
                bl: !1,
                mtr: !1,
                mr: !1,
                mt: !1,
                mb: !1,
                ml: !1,
                deleteControl: !1
            });

            frameImage.filters = frameImage.filters.concat([
                new fabric.filters.Brightness(),
                new fabric.filters.Contrast(),
            ]);

            frameImage.applyFilters();

            removeFabricObject(prevId);
            fabricCanvas?.centerObject(frameImage);
            fabricCanvas?.insertAt(1, frameImage);
        });
    }

    const setupFabric = (): fabric.Canvas => {
        const fbCanvas = new fabric.Canvas(canvasRef.current!, {
            enablePointerEvents: true,
            allowTouchScrolling: true,
            backgroundColor: '#EEEEF3',
            selection: false,
            preserveObjectStacking: true,
            hoverCursor: 'pointer',
        });

        if (isMd) {
            fbCanvas.setDimensions({
                width: 500,
                height: 500,
            });
        } else {
            fbCanvas.setDimensions({
                width: 300,
                height: 300,
            });
        }

        return fbCanvas;
    }
    
    React.useEffect(() => {
        const fbCanvas = setupFabric();
        setFabricCanvas(fbCanvas);

        if (frameUrl) {
            addBackgroundTwibbon(frameUrl);
        }

        console.log('fb canvas 01');

        return () => {
            fbCanvas.dispose();
        }
    }, []);

    React.useEffect(() => {
        console.log('canvas cleared');
        fabricCanvas?.clear();

        if (isMd) {
            setRecommendedSize({
                height: 500,
                width: 500,
            });

            fabricCanvas?.setDimensions({
                width: 500,
                height: 500,
            });
        } else {
            setRecommendedSize({
                height: 300,
                width: 300,
            });

            fabricCanvas?.setDimensions({
                width: 300,
                height: 300,
            });
        }

        if (frameUrl) {
            addBackgroundTwibbon(frameUrl);

            if (lastTwb) {
                addFrameTwibbon(lastTwb);
            }
        }
    }, [isMd]);

    React.useEffect(() => {
        for (const obj of fabricCanvas?.getObjects() ?? []) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((obj as any).name === 'twibbon_frame') {
                obj.scale(
                    Math.max(0.0025, scaled),
                );
                obj.setCoords();

                fabricCanvas?.renderAll();
            }
        }
    }, [scaled]);

    return {
        canvasRef,
        fabricCanvas,
        addFrame: addFrameTwibbon,
        addBackground: addBackgroundTwibbon,
        recommendedSize,
        toDataUrl() {
            return fabricCanvas?.toDataURL({
                quality: 1,
                format: 'jpeg',
                top: 0,
                left: 0,
                multiplier: 2,
                height: recommendedSize.height,
                width: recommendedSize.width,
            });
        },
        setScaled,
        scaledNumber: scaled,
    }
}