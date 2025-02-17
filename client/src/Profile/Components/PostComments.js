import React, { Component } from 'react'
import { Checkbox, Comment, Button, Form, TextArea } from 'semantic-ui-react'
import IndividualComments from './IndividualComments'
import PostReplyBox from './PostReplyBox'
import axios from 'axios'

export default class CommentExamplecommentsCollapsed extends Component {

  constructor(props) {
    super(props);

    this.showComments = this.showComments.bind(this);

    this.state = { 
      commentsCollapsed: true 
     }

  }


  showComments = () => (
      this.state.commentsCollapsed ? this.setState({commentsCollapsed: false}) : this.setState({commentsCollapsed: true})
  )

  



  render(props) {
    const { commentsCollapsed } = this.state
    const commentsNumber = this.props.comments.length


    return (
      <div>
       <div>
       <Button circular color="grey" icon='comments' onClick={this.showComments}/>
        {commentsNumber === 0 ? <a style={{cursor: "pointer", color: "#67C8D3"}} onClick={this.showComments}> {commentsNumber} comments</a> : <a style={{cursor: "pointer", color: "inherit"}} onClick={this.showComments}> {commentsNumber} comments</a>}
        </div>

        <Comment.Group>
          <Comment>

                  {this.props.comments.slice(0).map((comment, key) => (
                    // console.log(comment),
                    <Comment.Group collapsed={commentsCollapsed}>
                        <IndividualComments userInfo={this.props.userInfo} loggedInUserInfo={this.props.loggedInUserInfo} message={comment.text} date={comment.date.slice(0,10)} user_id={comment.user._id} comment_id={comment._id} updateParent={this.props.updateParent} comment_user={comment.user}/>
                    </Comment.Group>       
                ))}

            <Comment.Group collapsed={commentsCollapsed}>
                <PostReplyBox postId={this.props.postId} updateParent={this.props.updateParent} showComments={this.showComments}/>
            </Comment.Group>

          </Comment>
        </Comment.Group>
      </div>
    )
  }
}

