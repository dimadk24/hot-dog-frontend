import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Group extends Component {
    render() {
        const {group} = this.props
        return (
            <div className="group">
                <div className="group__details">
                    <img src={group.avatar_url} alt="avatar" />
                    {group.name}
                </div>
                <span className="plus-sign" onClick={() => {console.log("Group chosen");}}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Group)
