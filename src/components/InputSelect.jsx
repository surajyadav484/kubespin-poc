import { useState } from "react";
import Select, { components } from "react-select";

// Dummy options
const options = {
  Workload: [
    { label: "Workload1", value: "workload1", parent:'Workload' },
    { label: "Workload2", value: "workload2", parent:'Workload' },
    { label: "Workload3", value: "workload3", parent:'Workload' },
    { label: "Workload4", value: "workload4", parent:'Workload' },
  ],
  Namespace: [
    { label: "Namespace1", value: "Namespace1", parent:'Namespace' },
    { label: "Namespace2", value: "Namespace2", parent:'Namespace' },
    { label: "Namespace3", value: "Namespace3", parent:'Namespace' },
    { label: "Namespace4", value: "Namespace4", parent:'Namespace' },
  ],
  Type: [
    { label: "Type1", value: "Type1", parent:'Type' },
    { label: "Type2", value: "Type2", parent:'Type' },
    { label: "Type3", value: "Type3", parent:'Type' },
    { label: "Type4", value: "Type4", parent:'Type' },
  ],
  Pod: [
    { label: "Pod1", value: "Pod1", parent:'Pod' },
    { label: "Pod2", value: "Pod2", parent:'Pod' },
    { label: "Pod3", value: "Pod3", parent:'Pod' },
    { label: "Pod4", value: "Pod4", parent:'Pod' },
  ],
};

const optionsKeys = Object.keys(options).map((option) => ({
  label: option,
  value: option,
}));

// Custom Dropdown with Header and Tag Styling
const CustomMenuList = (props) => {
  // const { onChange } = props;
  return (
    <components.MenuList {...props}>
      <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500">
        SEARCH IN CRITERIA
      </div>
      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {props.children}
        {/* {props.options.map((option) => (
          <div
            key={option.value}
            className="bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded"
            // onClick={() => {
            //   onChange(option);
            // }}
          >
            {option.label}
          </div>
        ))} */}
      </div>
      {/* {props.children} */}
    </components.MenuList>
  );
};

const CustomMultiValue = (props) => {
  const { data, selectedItem } = props;
  return (
    <components.MultiValue {...props}>
      <div className="bg-gray-200 text-sm font-medium rounded px-2 py-1 flex items-center gap-1">
        <span>{selectedItem.label}</span>
        <components.MultiValueRemove {...props} />
      </div>
    </components.MultiValue>
  );
};

export default function InputSelect() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [newlySelectedItem, setNewlySelectedItem] = useState({
    option: "",
    value: "",
  });

  const showOriginalOption = !options[newlySelectedItem.value]?.length;

  return (
    <div className="w-96">
      <Select
        // components={{
        //   ...(!selectedItem && {
        //     MenuList: (props) => (
        //       <CustomMenuList {...props} onChange={setSelectedItem} />
        //     ),
        //   }),
        //   // MultiValue: (props) =>  <CustomMultiValue {...props} selectedItem={selectedItem} />,
        // }}
        components={
          showOriginalOption && {
            MenuList: CustomMenuList,
            Option: CustomOption,
          }
        }
        isMulti
        placeholder="Enter search keywords"
        options={
          !showOriginalOption ? options[newlySelectedItem.value] : optionsKeys
        }
        getOptionLabel={(option) => option.parent ? `${option.parent}:${option.label}`: `${option.label}`}
        isSearchable
        isClearable
        closeMenuOnSelect={false}
        // value={selectedItem}
        onChange={(newlySelected) => {
          if (newlySelected?.length > selectedItem?.length) {
            const filteredItems = newlySelected.find(
              (item) =>
                !selectedItem ||
                !selectedItem.some((selected) => selected.value === item.value)
            );
            console.log("🚀 ~ InputSelect ~ filteredItems:", filteredItems)
            setNewlySelectedItem(filteredItems);
          }
          setSelectedItem(newlySelected);
        }}
      />
    </div>
  );
}

// const CustomMenuList = (props) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "8px",
//         padding: "8px",
//       }}
//     >
//       {props.children}
//     </div>
//   )
// }

const CustomOption = (props) => {
  return (
    <div
      className="bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded"
      {...props.innerProps}
    >
      {props.data.label}
    </div>
  );
};


// export default function HorizontalSelect() {
//   return (
//     <div className="w-[300px]">
//       <Select
//         options={options}
//         components={{ MenuList: CustomMenuList, Option: CustomOption }}
//         placeholder="Select fruit"
//       />
//     </div>
//   )
// }
