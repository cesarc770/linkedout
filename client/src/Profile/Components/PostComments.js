import React, { Component } from 'react'
import { Checkbox, Comment, Button, Form, TextArea } from 'semantic-ui-react'
import IndividualComments from './IndividualComments'
import PostReplyBox from './PostReplyBox'
import axios from 'axios'

export default class CommentExamplecommentsCollapsed extends Component {
  state = { commentsCollapsed: true }

  

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
        {commentsNumber === 0 ? <a style={{cursor: "pointer", color: "inherit"}} onClick={this.showComments}> {commentsNumber} comments</a> : <a style={{cursor: "pointer", color: "inherit"}} onClick={this.showComments}> {commentsNumber} comments</a>}
        </div>

        <Comment.Group>
          <Comment>

                  {this.props.comments.slice(0).reverse().map((comment, key) => (
                    console.log(comment),
                    <Comment.Group collapsed={commentsCollapsed}>
                        <IndividualComments userInfo={this.props.userInfo} loggedInUserInfo={this.props.loggedInUserInfo} message={comment.text} date={comment.date.slice(0,10)} user_id={comment.user} comment_id={comment._id} updateParent={this.props.updateParent}/>
                    </Comment.Group>       
                ))}

            <Comment.Group collapsed={commentsCollapsed}>
                <PostReplyBox postId={this.props.postId} updateParent={this.props.updateParent}/>
            </Comment.Group>

          </Comment>
        </Comment.Group>
      </div>
    )
  }
}