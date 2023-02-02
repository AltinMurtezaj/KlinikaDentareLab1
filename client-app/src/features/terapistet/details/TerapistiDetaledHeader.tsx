import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Terapisti } from '../../../app/models/terapisti';

const terapistiImageStyle = {
    filter: 'brightness(30%)'
};

const terapistiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    terapisti: Terapisti
}

export default observer (function TerapistiDetailedHeader({terapisti}: Props) {
    const{terapistiStore} = useStore();
    const{deleteTerapisti, loading, loadTerapistet} = terapistiStore;
    const[target, setTarget] =useState('');

    function handleTerapistiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTerapisti(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/terapisti.png`} fluid style={terapistiImageStyle}/>
                <Segment style={terapistiImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={terapisti.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (terapisti.datelindja!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Altin & Safet</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button name={terapisti.id}
                as={Link} to={'/terapistet'}
                loading={loading && target === terapisti.id}
                onClick={(e)=>handleTerapistiDelete(e, terapisti.id)}
                 color='red'>Delete Terapisti</Button>
                <Button as={Link} to={`/manageTerapisti/${terapisti.id}`} color='blue' floated='right'>
                    Edit Terapisti
                </Button>
            </Segment>
        </Segment.Group>
    )
})