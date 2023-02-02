import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { Doktori } from '../../../app/models/doktori';
import { useStore } from '../../../app/stores/store';

const doktoriImageStyle = {
    filter: 'brightness(30%)'
};

const doktoriImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    doktori: Doktori
}

export default observer (function DoktoriDetailedHeader({doktori}: Props) {
    const{doktoriStore} = useStore();
    const{deleteDoktori, loading, loadDoktoret} = doktoriStore;
    const[target, setTarget] =useState('');

    function handleDoktoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDoktori(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/doctor.png`} fluid style={doktoriImageStyle}/>
                <Segment style={doktoriImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={doktori.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (doktori.datelindja!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Altin & Safet</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button name={doktori.id}
                as={Link} to={'/doktoret'}
                loading={loading && target === doktori.id}
                onClick={(e)=>handleDoktoriDelete(e, doktori.id)}
                 color='red'>Delete Doktori</Button>
                <Button as={Link} to={`/manageDoktori/${doktori.id}`} color='blue' floated='right'>
                    Edit Doktori
                </Button>
            </Segment>
        </Segment.Group>
    )
})