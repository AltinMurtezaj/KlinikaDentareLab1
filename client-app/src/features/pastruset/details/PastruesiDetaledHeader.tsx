import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { Pastruesi } from '../../../app/models/pastruesi';

const pastruesiImageStyle = {
    filter: 'brightness(30%)'
};

const pastruesiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    pastruesi: Pastruesi
}

export default observer (function PastruesiDetailedHeader({pastruesi}: Props) {
    const{pastruesiStore} = useStore();
    const{deletePastruesi, loading} = pastruesiStore;
    const[target, setTarget] =useState('');

    function handlePastruesiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePastruesi(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/pastruesi.png`} fluid style={pastruesiImageStyle}/>
                <Segment style={pastruesiImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={pastruesi.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (pastruesi.datelindja!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Altin & Safet</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button name={pastruesi.id}
                as={Link} to={'/farmacistet'}
                loading={loading && target === pastruesi.id}
                onClick={(e)=>handlePastruesiDelete(e, pastruesi.id)}
                 color='red'>Delete Cleaner</Button>
                <Button as={Link} to={`/managePastruesi/${pastruesi.id}`} color='blue' floated='right'>
                    Edit Cleaner
                </Button>
            </Segment>
        </Segment.Group>
    )
})