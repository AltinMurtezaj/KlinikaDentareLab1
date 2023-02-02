import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Pastruesi } from '../../../app/models/pastruesi';

interface Props {
    pastruesi: Pastruesi
}

export default function pastruesiListItem({pastruesi}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/pastruesi.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/pastrueset/${pastruesi.id}`}>
                                {pastruesi.emri}
                            </Item.Header>
                            
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (pastruesi.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {pastruesi.gjinia}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{pastruesi.vendbanimi}</span>
                <Button 
                    as={Link}
                    to={`/pastrueset/${pastruesi.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}