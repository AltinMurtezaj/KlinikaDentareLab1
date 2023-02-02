import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Laboranti } from '../../../app/models/laboranti';

interface Props {
    laboranti: Laboranti
}

export default function LaborantiListItem({laboranti}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/labicon.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/laborantet/${laboranti.id}`}>
                                {laboranti.emri}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (laboranti.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {laboranti.mbiemri}
                </span>
            </Segment>
            <Segment clearing>
                <span>{laboranti.laboratori}</span>
                <Button 
                    as={Link}
                    to={`/laborantet/${laboranti.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}