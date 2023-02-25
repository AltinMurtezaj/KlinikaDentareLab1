
import { format } from 'date-fns';
import { Card, Container,  Header, Input } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default function Llogaria(){

    const {userStore}=useStore();
    const {user}=userStore;


const tabela = {
    marginTop:"10px",
   flexdirection:"column",
   
}

const karta ={
    marginTop:"150px",
    width:"500px",
}



return (

    <Card style={karta}>
    <Card.Content >
    <Container style={tabela}>

         <div className="container" > 
          <Header>Numri Personal:</Header>
          <Input readOnly className='Input'>{user?.userName}</Input>
         </div>
<div className="container" > 
        <Header>Emri:</Header>
        <Input readOnly className='Input'>{user?.emri}</Input>
</div>
       <div className="container" > 
        <Header>Mbiemri:</Header>
        <Input readOnly className='Input'>{user?.mbiemri}</Input>
        </div> 
        <div className="container" > 
        <Header>Emaili:</Header>
        <Input readOnly className='Input'>{user?.email}</Input>
        </div>
        <div className="container" > 
        <Header>Ditelindja:</Header>
        <Input readOnly className='Input'>{format(new Date(user?.datelindja!),'dd MMM yyyy')}</Input>
        </div>
        <div className="container" > 
        <Header>Gjinia:</Header>
        <Input readOnly className='Input'>{user?.gjinia}</Input>
        </div>
        <div className="container" > 
        <Header>Vendlindja:</Header>
        <Input readOnly className='Input'>{user?.vendbanimi}</Input>
        </div>
        <div className="container" > 
        <Input readOnly className='Input'>{user?.discriminator}</Input>
        </div>

  </Container>
    </Card.Content>
  </Card>

)


};