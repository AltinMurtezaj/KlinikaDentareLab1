import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Infermierja } from '../../../app/models/infermierja';
import {format} from 'date-fns';
import { useStore } from '../../../app/stores/store';

const infermierjaImageStyle = {
    filter: 'brightness(30%)'
};

const infermierjaImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    infermierja: Infermierja
}

export default observer (function InfermierjaDetailedHeader({infermierja}: Props) {
    const{infermierjaStore} = useStore();
    const{deleteInfermierja, loading, loadInfermjeret} = infermierjaStore;
    const[target, setTarget] =useState('');

    function handleInfermierjaDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteInfermierja(id);
      }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/nursejpg.jpg`} fluid style={infermierjaImageStyle}/>
                <Segment style={infermierjaImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={infermierja.emri}
                                    
                                    
                                    style={{color: 'white'}}
                                />
                                <p>{format (infermierja.datelindja!, 'dd MMM yyyy')}</p>
        
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button name={infermierja.id}
                as={Link} to={'/infermjeret'}
                loading={loading && target === infermierja.id}
                onClick={(e)=>handleInfermierjaDelete(e, infermierja.id)}
                 color='red'>Delete Nurse</Button>

                <Button as={Link} to={`/manageInfermierja/${infermierja.id}`} color='blue' floated='right'>
                    Edit Nurse
                </Button>
            </Segment>
        </Segment.Group>
    )
})