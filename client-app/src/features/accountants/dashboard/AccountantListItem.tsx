import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Accountant } from '../../../app/models/accountant';

interface Props {
    accountant: Accountant
}

export default function accountantListItem({accountant}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/accountants/${accountant.id}`}>
                                {accountant.emri}
                            </Item.Header>
                            <Item.Description>Hosted by Altin</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (accountant.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {accountant.gjinia}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{accountant.vendbanimi}</span>
                <Button 
                    as={Link}
                    to={`/accountants/${accountant.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}