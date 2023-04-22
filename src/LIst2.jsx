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
