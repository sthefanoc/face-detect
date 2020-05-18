import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

// const Logo = () => {
//     return (
//         <div className="ma4 mt0">
//             <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
//                 <div className="Tilt-inner pa4">
//                     <img style={{paddingTop: '5px'}} src={brain} alt="Brain"/>
//                 </div>
//             </Tilt>

//         </div>
//     );
// }

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }
    render() {
        return (
            <div className="ma4 mt0">
                <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa4">
                        <img style={{paddingTop: '5px'}} src={brain} alt="Brain"/>
                    </div>
                </Tilt>
    
            </div>
        )
    }
}

// add reference ref={this.wrapper}>{this.props.children}

export default Logo;
