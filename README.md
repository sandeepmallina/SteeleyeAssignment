# SteeleyeAssignment

1)Explain what the simple List component does.

The List component takes an array of items as a prop and displays them as an unordered list. Each item in the list is rendered using the SingleListItem component. When an item is clicked, its index is stored in the selectedIndex state variable and passed to the SingleListItem component to indicate that it is selected. The List component also has a default set of items that it will display if no items prop is provided.
2)What problems / warnings are there with code?

_propTypes.default.shapeOf is not a function

hence the error suggest then shapeOf is not a function .it should be replaced with shape .shape is validation of shape of the object it do not consider if any extra values were added .we can do that by using exact 
To match the exact  object body we can use exact it will throw a warning if any extra value were present 

Cannot read properties of null (reading 'map')

this error beacause no array of objects named items is passed to WrappedListComponent. we can get rid of this error by passing the items through props.or by using defaultprops. Defaultprops pass the default values to the component it no values were given.We can add conditional rendering to the map.key warnings so i added id in items as key  

setSelectedIndex is not a function.


error beacuse of this line const [setSelectedIndex,selectedIndex] = useState();
here useSate is not destructred properly so the correct code the 
const [selectedIndex,setSelectedIndex] = useState();
selectedIndex is current state
setSelectedIndex is used update our  current state


3) fixing, optimizeing, and modifying the component 

import React, { useState, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";

const WrappedSingleListItem = ({ isselected, onClick, text }) => {
  return (
    <li
      style={{ backgroundColor: isselected ? "green" : "red" }}
      onClick={onClick}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isselected: PropTypes.bool.isRequired
};

const SingleListItem = memo(WrappedSingleListItem);

const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  return (
    <ul style={{ textAlign: "left" }}>
      {items &&
        items.map((item, index) => (
          <SingleListItem
            key={item.id}
            onClick={() => handleClick(index)}
            text={item.text}
            isselected={index === selectedIndex}
          />
        ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  )
};

WrappedListComponent.defaultProps = {
  items: [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" }
  ]
};

const List2 = memo(WrappedListComponent);

export default List2;

The handleClick function is passed as a prop to SingleListItem component, which means that it will be re-created every time the WrappedListComponent is re-rendered. To avoid unnecessary re-creation of the function i used useCallback()

mallina sandeep 

mallinasandeep21@gmail.com
