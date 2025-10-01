import { Panel, useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    const el = document.querySelector('.react-flow__viewport');
    if (!el) {
      console.warn('React Flow viewport element not found');
      return;
    }
    if (!(el instanceof HTMLElement)) {
      console.warn('Found element is not an HTMLElement', el);
      return;
    }

    toPng(el, {
      backgroundColor: '#fcfcfc',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        transformOrigin: '0 0',
      },
    })
      .then((dataUrl) => {
        downloadImage(dataUrl);
      })
      .catch((err) => {
        console.error('Export failed', err);
      });
  };

  return (
    <Panel position="top-right">
      <button className="download-btn xy-theme__button" onClick={onClick}>
        Download Image
      </button>
    </Panel>
  );
}

export default DownloadButton;
