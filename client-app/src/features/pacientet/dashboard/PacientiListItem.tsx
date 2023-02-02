import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Pacienti } from '../../../app/models/pacienti';

interface Props {
    pacienti: Pacienti
}

export default function pacientiListItem({pacienti}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='/assets/patient.png'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/pacientet/${pacienti.id}`}>
                                {pacienti.emri}
                            </Item.Header>
                            
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (pacienti.datelindja!, 'dd MMM yyyy')}
                    <Icon name ='marker'/> {pacienti.gjinia}
                </span>
            </Segment>
            <Segment clearing>
                <span>{pacienti.vendbanimi}</span>
                <Button 
                    as={Link}
                    to={`/pacientet/${pacienti.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}