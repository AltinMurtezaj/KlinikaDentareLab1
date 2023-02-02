import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Farmacisti } from '../../../app/models/farmacisti';

interface Props {
    farmacisti: Farmacisti
}

export default function FarmacistiListItem({farmacisti}: Props){

    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='assets/jpg.jpg'/>
                        <Item.Content>
                            <Item.Header as ={Link} to={`/farmacistet/${farmacisti.id}`}>
                                {farmacisti.emri} {farmacisti.mbiemri}
                                
                            </Item.Header>
                            
                            <Item.Description>Hosted by Altin</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name ='time'/> {format (farmacisti.datelindja!, 'dd MMM yyyy h:mm aa')}
                    <Icon name ='marker'/> {farmacisti.gjinia}
                </span>
            </Segment>
          
            <Segment clearing>
                <span>{farmacisti.vendbanimi} {farmacisti.vendbanimi}</span> 
                
                <Button 
                    as={Link}
                    to={`/farmacistet/${farmacisti.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}