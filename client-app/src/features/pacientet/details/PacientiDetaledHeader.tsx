import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Pacienti } from '../../../app/models/pacienti';
import { useStore } from '../../../app/stores/store';

const pacientiImageStyle = {
    filter: 'brightness(30%)'
};

const pacientiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    pacienti: Pacienti
}

export default observer (function PacientiDetailedHeader({pacienti}: Props) {
    const{pacientiStore} = useStore();
    const{deletePacienti, loading} = pacientiStore;
    const[target, setTarget] =useState('');

    function handlePacientiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePacienti(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/patient.png`} fluid style={pacientiImageStyle}/>
                <Segment style={pacientiImageStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={pacienti.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (pacienti.datelindja!, 'dd MMM yyyy')}</p>
                               
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Button name={pacienti.id}
                as={Link} to={'/pacientet'}
                loading={loading && target === pacienti.id}
                onClick={(e)=>handlePacientiDelete(e, pacienti.id)}
                 color='red'>Delete Pacienti</Button>
                <Button as={Link} to={`/managePacienti/${pacienti.id}`} color='blue' floated='right'>
                    Edit Pacienti
                </Button>
            </Segment>
        </Segment.Group>
    )
})