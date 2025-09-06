import React from "react";

// You'll need to install react-icons: npm install react-icons
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface Item {
  title: string;
  value: string;
  price?: string;
}

interface Props {
  label?: string;
  setOpenDropDown: (open: boolean) => void;
  openDropDown: boolean;
  selected: Item | null;
  setSelected: (item: Item | null) => void;
  placeholder: string;
  dataItem: Item[];
  whiteBg?: boolean;
  primary?: boolean;
  style?: React.CSSProperties;
}

const CustomSelect: React.FC<Props> = ({
  label,
  setOpenDropDown,
  openDropDown,
  selected,
  setSelected,
  placeholder,
  dataItem,
  primary,
  whiteBg,
  style,
}) => {
  const handleItemPress = (item: Item) => {
    setSelected(item);
    setOpenDropDown(false);
  };

  const getBgStyles = (): React.CSSProperties => {
    if (primary) {
      return {
        border: "1px solid #99a1af",
        // backgroundColor: "#f8f9fa", // equivalent to onsurface
      };
    }
    if (whiteBg) {
      return {
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0", // equivalent to divider
      };
    }
    return {
      border: "1px solid #EAEAEA",
      backgroundColor: "#ffffff",
    };
  };

  const selectStyles: React.CSSProperties = {
    position: "relative",
    height: "45px",
    padding: "12px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    ...getBgStyles(),
    ...style,
  };

  const labelStyles: React.CSSProperties = {
    marginBottom: "8px",
    fontWeight: 500,
    fontSize: "12px",
    color: "#101828",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const textStyles: React.CSSProperties = {
    fontSize: "12px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 400,
  };

  const dropdownStyles: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "12px",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  };

  const itemStyles: React.CSSProperties = {
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    margin: "4px 0",
    border: "1px solid #E8E8E8",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const itemHoverStyles: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {label && <div style={labelStyles}>{label}</div>}

      <div style={selectStyles} onClick={() => setOpenDropDown(!openDropDown)}>
        <span style={textStyles}>
          {selected ? selected.title : placeholder}
        </span>
        <div>
          {openDropDown ? (
            <AiFillCaretUp size={20} color="#1E1D2F" />
          ) : (
            <AiFillCaretDown size={20} color="#1E1D2F" />
          )}
        </div>
      </div>

      {openDropDown && (
        <div style={dropdownStyles}>
          {dataItem.map((item: Item) => (
            <div
              key={item.value}
              style={itemStyles}
              onClick={() => handleItemPress(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  itemHoverStyles.backgroundColor!;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div>
                <div style={textStyles}>{item.title}</div>
                {item.price && (
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      color: "#666",
                    }}
                  >
                    {item.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
