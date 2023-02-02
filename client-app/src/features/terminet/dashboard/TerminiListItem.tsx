import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Termini } from '../../../app/models/termini';
interface Props {
    termini: Termini
}

export default function TerminiListItem({termini}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/appointment.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/terminet/${termini.id}`}>
                                {termini.emri}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (termini.data!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {termini.orari}
                    <Icon name ='marker'/> {termini.pershkrimi}
                </span>
            </Segment>
            <Segment clearing>
                <Button 
                    as={Link}
                    to={`/terminet/${termini.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}