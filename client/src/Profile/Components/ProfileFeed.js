import React, {Component} from 'react'
import { Header, Segment, Container, Divider, Loader } from 'semantic-ui-react'
import FeedMessages from './ProfileFeedPosts'

class ProfileFeed extends React.Component {
  
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2000); // simulates an async action, and hides the spinner
  }
  
  render(props) {
    const { loading } = this.state;
    
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return (
        <div>
        <Container>
          <Segment>
            <Divider horizontal><h3  textAlign="center" style={{color: "grey"}}>My Posts</h3></Divider>

                <Loader active inline='centered' />

          </Segment>
      </Container>
    </div>
      )
    }
    
    return (
      <div>
      <Container>
        <Segment>
          <Divider horizontal><h3  textAlign="center" style={{color: "grey"}}>My Posts</h3></Divider>

            <FeedMessages messageType = "Job Posting" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "News Feed" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "News Feed" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "Thought of The Day" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "Job Posting" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "Recruitment" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>

            <FeedMessages messageType = "Thought of The Day" name={this.props.first_name + " " + this.props.last_name} image_url={this.props.image_url} message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at tellus at urna. Magna eget est lorem ipsum dolor sit amet consectetur. Gravida dictum fusce ut placerat orci." date="February 13, 2018"/>
        </Segment>
    </Container>
  </div>
    ); 
  }
}

export default ProfileFeed
