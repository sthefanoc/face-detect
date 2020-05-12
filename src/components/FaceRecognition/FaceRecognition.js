import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                { imageUrl === ''
                    ? <p>Paste your link above to find faces</p>
                    :<img id="inputImage" src={imageUrl} alt="Recognized version" max-width="500px" width="100%" height="auto"/>}
                <div className="bounding-box" style={{top: box.topLine, right: box.rightCol, bottom: box.bottomLine, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;
