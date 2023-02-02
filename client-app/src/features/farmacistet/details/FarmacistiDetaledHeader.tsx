import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Farmacisti } from '../../../app/models/farmacisti';

const farmacistiImageStyle = {
    filter: 'brightness(30%)'
};

const farmacistiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    farmacisti: Farmacisti
}

export default observer (function FarmacistiDetailedHeader({farmacisti}: Props) {
    const{farmacistiStore} = useStore();
    const{deleteFarmacisti, loading, loadFarmacistet} = farmacistiStore;
    const[target, setTarget] =useState('');

    function handleFarmacistiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteFarmacisti(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/farmacisti.png`} fluid style={farmacistiImageStyle}/>
                <Segment style={farmacistiImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={farmacisti.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (farmacisti.datelindja!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Altin & Safet</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button name={farmacisti.id}
                as={Link} to={'/farmacistet'}
                loading={loading && target === farmacisti.id}
                onClick={(e)=>handleFarmacistiDelete(e, farmacisti.id)}
                 color='red'>Delete Farmacisti</Button>
                <Button as={Link} to={`/manageFarmacisti/${farmacisti.id}`} color='blue' floated='right'>
                    Edit Farmacisti
                </Button>
            </Segment>
        </Segment.Group>
    )
})