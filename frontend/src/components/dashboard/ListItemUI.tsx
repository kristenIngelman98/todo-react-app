import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons' // import single icon

const TrashCanWrapper = styled.div` 
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;

  svg {
    color: #c9184a;
  }
`;

const ListItemWrapper = styled.div`
  display: flex;
  justify-conent: space-between

  li {
    font-family: 'Neucha', cursive;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const Item = styled.li`
  font-family: 'Neucha', cursive;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.2em;
`

interface Props {
    description: string;
    deleteButtonHandler: () => void;
}

const ListItem = ( { description, deleteButtonHandler }: Props ) => {

    return (
        <ListItemWrapper>
             <Item>{description}</Item>
             <TrashCanWrapper>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteButtonHandler()} />
            </TrashCanWrapper>
        </ListItemWrapper>
    )
}

export default ListItem;