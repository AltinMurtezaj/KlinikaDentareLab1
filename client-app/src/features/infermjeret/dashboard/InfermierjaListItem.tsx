import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Infermierja } from '../../../app/models/infermierja';
import {format} from 'date-fns';
interface Props {
    infermierja: Infermierja
}

export default function InfermierjaListItem({infermierja}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='assets/nursejpg.jpg'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/infermjeret/${infermierja.id}`}>
                                {infermierja.emri} {infermierja.mbiemri}
                                
                            </Item.Header>
                            
                            <Item.Description>Hosted by Altin</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (infermierja.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {infermierja.gjinia}
                    <Icon name ='marker'/> {infermierja.specializimi}
                </span>
            </Segment>
          
            <Segment clearing>
                <span>{infermierja.kualifikimi} {infermierja.vendbanimi}</span> 
                
                <Button 
                    as={Link}
                    to={`/infermjeret/${infermierja.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}