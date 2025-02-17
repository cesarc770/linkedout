import React from 'react'
import { Header, Icon, Image, Segment, Divider, List } from 'semantic-ui-react'

const NewUserCard = (props) => (
  <div>
        <Segment style={{textAlign: "center", minHeight:"76vh"}}>
        <Image src={props.userInfo.file.preview} size='small' verticalAlign='middle' circular style={{padding: "2px", backgroundColor:"white", border: "2px solid grey", marginLeft:"2%", height: "14vh", width: "14vh", overflow: "hidden"}} centered/>
        <Header as='h2' icon textAlign="center">
            My Profile
                <Header.Subheader >
                </Header.Subheader>
            </Header>
            
            <Header as='h2' icon textAlign="center">
            <Divider horizontal>Contact Information</Divider>
                <Header.Subheader >
                </Header.Subheader>
            </Header>

                         <List style={{color: "grey"}} textAlign="center">
                            <List.Item>
                            <List.Icon name='users' />
                            <List.Content>{props.userInfo.firstName + " " + props.userInfo.lastName}</List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Icon name='marker'/>
                            <List.Content>{props.userInfo.location}</List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Icon name='mail' />
                            <List.Content>
                                {props.userInfo.email}
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Icon name='phone' />
                            <List.Content>
                            <List.Content>{props.userInfo.phone}</List.Content>
                            </List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Icon name='calendar' />
                            <List.Content>
                            <List.Content>{props.userInfo.birthday}</List.Content>
                            </List.Content>
                            </List.Item>
                        </List>

            <Header as='h2' icon textAlign="center">
            <Divider horizontal>About Me</Divider>
                <Header.Subheader >
                </Header.Subheader>
            </Header>
            <div style={{color: "grey"}}>
                {props.userInfo.about}
            </div>

            <Header as='h2' icon textAlign="center">
            <Divider horizontal>Company Information</Divider>
                <Header.Subheader >
                </Header.Subheader>
            </Header>


                        <List style={{color: "grey"}} textAlign="center">
                            <List.Item>
                            <List.Icon name='building outline' />
                            <List.Content>{props.userInfo.current_company}</List.Content>
                            </List.Item>
                            <List.Item>
                            <List.Icon name='circle notched'/>
                            <List.Content>{props.userInfo.job_title}</List.Content>
                            </List.Item>
                            <List.Item>
                            </List.Item>
                        </List>

        </Segment>
  </div>

)

export default NewUserCard