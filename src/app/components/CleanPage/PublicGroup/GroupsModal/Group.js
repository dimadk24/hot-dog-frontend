import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    AddGroupInCleanQue,
    DeleteGroupFromCleanQue
} from '../../../../../store/reducers/reducer.clean'
class Group extends Component {
    render() {
        const {group, AddGroupInCleanQue, DeleteGroupFromCleanQue} = this.props
        return (
            <div className="group">
                <div className="group__details">
                    <img src={group.avatar_url} alt="avatar" />
                    {group.name}
                </div>
                <span
                    className={`plus-sign ${
                        group.inCleanQue ? 'plus-sign--cris' : ''
                    }`}
                    onClick={() => {
                        if (group.inCleanQue) {
                            console.log("Group for deleting", group);
                            DeleteGroupFromCleanQue(group.id, group.backEndID)
                        } else {
                            AddGroupInCleanQue(group.id)
                        }
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
            AddGroupInCleanQue,
            DeleteGroupFromCleanQue
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Group)
