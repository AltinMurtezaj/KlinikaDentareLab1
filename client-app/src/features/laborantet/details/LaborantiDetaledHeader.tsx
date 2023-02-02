import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Laboranti } from '../../../app/models/laboranti';
import { useStore } from '../../../app/stores/store';

const laborantiImageStyle = {
    filter: 'brightness(30%)'
};

const laborantiImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    laboranti: Laboranti
}

export default observer (function LaborantiDetailedHeader({laboranti}: Props) {
    const{laborantiStore} = useStore();
    const{deleteLaboranti, loading} = laborantiStore;
    const[target, setTarget] =useState('');

    function handleLaborantiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteLaboranti(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/lab.jpg`} fluid style={laborantiImageStyle}/>
                <Segment style={laborantiImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={laboranti.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (laboranti.datelindja!, 'dd MMM yyyy')}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Button name={laboranti.id}
                as={Link} to={'/laborantet'}
                loading={loading && target === laboranti.id}
                onClick={(e)=>handleLaborantiDelete(e, laboranti.id)}
                 color='red'>Delete Laboranti</Button>
                <Button as={Link} to={`/manageLaboranti/${laboranti.id}`} color='blue' floated='right'>
                    Edit Laboranti
                </Button>
            </Segment>
        </Segment.Group>
    )
})