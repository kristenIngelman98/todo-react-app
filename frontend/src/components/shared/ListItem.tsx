import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const TrashCanWrapper = styled.div` 
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;

  svg {
    color: #c9184a;
  }
`;

interface Props {
    description: string;
    deleteButtonHandler: () => void;
}
const ListItem = ( {description, deleteButtonHandler }: Props ) => {

    return (
        <>
             <li className="list-group-item">{description}</li>
             <TrashCanWrapper>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteButtonHandler()} />
            </TrashCanWrapper>
        </>
    )
}

export default ListItem;