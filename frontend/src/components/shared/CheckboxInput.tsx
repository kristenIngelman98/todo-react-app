import styled from 'styled-components';

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: 0 !important;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #e0e1dd;
    border-radius: 100%;
    
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }

  .checkmark:after {
    left: 10px;
    top: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #c9184a;
  }
`;

interface Props {
    completed: boolean;
    updateStatus: () => void;
    deleteButtonHandler: () => void;
}

const CheckboxInput = ({ completed, updateStatus, deleteButtonHandler }: Props) => {

    return (
        <>
            <Label>
                <input className="checkboxStatus" type="checkbox"
                    defaultChecked={completed}
                    onChange={updateStatus}
                />
                <span className="checkmark"></span>
            </Label>

        </>
    )
}

export default CheckboxInput;