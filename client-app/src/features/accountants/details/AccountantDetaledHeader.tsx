import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {format} from 'date-fns';
import { Accountant } from '../../../app/models/accountant';

const accountantImageStyle = {
    filter: 'brightness(30%)'
};

const accountantImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    accountant: Accountant
}

export default observer (function AccountantDetailedHeader({accountant}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${accountant.emri}.jpg`} fluid style={accountantImageStyle}/>
                <Segment style={accountantImageStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={accountant.emri}
                                    style={{color: 'white'}}
                                />
                                <p>{format (accountant.datelindja!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Altin & Safet</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Accountant</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${accountant.id}`} color='orange' floated='right'>
                    Manage Accountant
                </Button>
            </Segment>
        </Segment.Group>
    )
})