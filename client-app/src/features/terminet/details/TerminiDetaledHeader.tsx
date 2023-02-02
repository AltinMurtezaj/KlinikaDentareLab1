import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import { Termini } from '../../../app/models/termini';
import { useStore } from '../../../app/stores/store';

const terminiImageStyle = {
    filter: 'brightness(30%)'
};
const terminiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    termini: Termini
}

export default observer (function TerminiDetailedHeader({termini}: Props) {
    const{terminiStore} = useStore();
    const{deleteTermini, loading} = terminiStore;
    const[target, setTarget] =useState('');

    function handleTerminiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTermini(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
           
                <Segment style={terminiImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={termini.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (termini.data!, 'dd MMM yyyy')}</p>
                                
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Button name={termini.id}
                as={Link} to={'/terminet'}
                loading={loading && target === termini.id}
                onClick={(e)=>handleTerminiDelete(e, termini.id)}
                 color='red'>Delete Termini</Button>
                <Button as={Link} to={`/manageTermini/${termini.id}`} color='orange' floated='right'>
                    Edit Termini
                </Button>
            </Segment>
        </Segment.Group>
    )
})