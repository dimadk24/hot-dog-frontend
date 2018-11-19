import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {SetGroupForCleaning} from '../../../../../store/reducers/reducer.clean'
class Group extends Component {
    render() {
        const {group, SetGroupForCleaning} = this.props
        return (
            <div className="group">
                <div className="group__details">
                    <img src={group.avatar_url} alt="avatar" />
                    {group.name}
                </div>
                <span
                    className={`plus-sign ${
                        group.isInCleanQue ? 'plus-sign--cris' : ''
                    }`}
                    onClick={() => {
                        SetGroupForCleaning(group.id)
                    }}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            SetGroupForCleaning
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Group)
