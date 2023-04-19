import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons' // import single icon
import { Todo } from '../../interfaces/Todo';

interface Props {
  description: string;
  deleteButtonHandler: (variable: Todo) => void;
  variable: Todo;
  todo: Todo; // do i need both of these?
  className: string;
}

const ListItem = ({ description, deleteButtonHandler, variable, todo, className }: Props) => {
  // update this, change names, etc.
  function deleteHandler() {
    const newVariable = todo;
    deleteButtonHandler(newVariable);
  }
  return (
    <div className={className}>
      <li>{description}</li>
      <div className="trashcan-wrapper">
        <FontAwesomeIcon icon={faTrashCan} onClick={deleteHandler} />
      </div>
    </div>
  )
}

const ListItemWrapper = styled(ListItem)`
  display: flex;
  justify-conent: space-between;

  li {
    font-family: 'Neucha', cursive;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.2em;
  }

  .trashcan-wrapper {
    margin-right: 20px;
    padding: 10px;
    border-radius: 5px;
  
    svg {
      color: #c9184a;
    }
  }
`

export default ListItemWrapper;