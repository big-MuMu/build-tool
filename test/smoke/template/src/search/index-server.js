
const React = require('react');
require('./search.less');

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
        return (
          <>
              <div className="text" onClick={this.handleClick}>12321277</div>
              {
                    Text && <Text />
                }
            </>
            
        )
        
    }
}

module.exports = <Search />;
