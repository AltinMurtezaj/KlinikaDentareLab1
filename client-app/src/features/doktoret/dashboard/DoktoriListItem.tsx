import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Doktori } from '../../../app/models/doktori';
interface Props {
    doktori: Doktori
}

export default function DoktoriListItem({doktori}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/doctoricon.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/doktoret/${doktori.id}`}>
                                {doktori.emri}
                            </Item.Header>
                            <Item.Description>Hosted by Safet</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (doktori.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {doktori.specializimi}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{doktori.kualifikimi}</span>
                <Button 
                    as={Link}
                    to={`/doktoret/${doktori.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}