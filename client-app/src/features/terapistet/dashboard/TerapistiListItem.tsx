import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Terapisti } from '../../../app/models/terapisti';

interface Props {
    terapisti: Terapisti
}

export default function terapistiListItem({terapisti}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/terapistet/${terapisti.id}`}>
                                {terapisti.emri}
                            </Item.Header>
                            <Item.Description>Hosted by Altin</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (terapisti.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {terapisti.gjinia}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{terapisti.vendbanimi}</span>
                <Button 
                    as={Link}
                    to={`/terapistet/${terapisti.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}