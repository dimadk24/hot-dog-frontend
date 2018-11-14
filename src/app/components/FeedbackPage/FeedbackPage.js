import React from 'react'
import './FeedbackPage.css'

class FeedbackPage extends React.Component {
    componentWillMount() {
        /*global VK*/
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        VK.Widgets.Comments('vk_comments', {
            limit: 10,
            attach: '*',
            height: 800
        })
    }
    render() {
        return (
            <div>
                <div id="vk_comments" className="vk-comments" />
            </div>
        )
    }
}

export default FeedbackPage
