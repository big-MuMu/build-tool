import React from 'react';
import ReactDom from 'react-dom';
import { A, B } from './tree-shaking.js';
// import { getStr } from '../common/common';
import './search.less';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: null
        }
    }

    handleClick = () => {
        import('./text.js').then(Text => {
            this.setState({
                Text: Text.default
            })
        })
    }

    render() {
        const { Text } = this.state;
        console.log(99, Text)
        return (
            <>
                <div className="text" onClick={this.handleClick}>1232127888007</div>
                {
                    Text && <Text />
                }
            </>
            
        )
        
        }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)