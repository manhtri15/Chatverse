import React from 'react';
import { Collapse, Typography} from 'antd';
import { Button } from "../../components/Button";
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: black;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: black;
      padding-top: 12px;
      padding-bottom: 12px;
      
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Danh sách các phòng' key='1'>  
        {rooms.map((room) => (
           <div style={{marginTop:16}}>
             <Button buttonStyle ="btn--warning--outline" buttonSize="btn--small" key={room.id} onClick={() => setSelectedRoomId(room.id)}>
               <div style={{color: 'black',fontSize: 14}}>{room.name}</div>
             </Button>
           </div>
         
        ))}
        <LinkStyled
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}><div style={{color: 'black',fontSize: 14}}>+    Thêm phòng</div>
        </LinkStyled>
      </PanelStyled>
    </Collapse>
  );
}
