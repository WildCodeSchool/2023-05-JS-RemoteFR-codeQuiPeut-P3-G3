import { AiFillExclamationCircle } from "react-icons/ai"

/* styles pour droplists */
export const stylesDLAdminActions = {
  valueContainer: (base) => ({
    ...base,
    // maxHeight: 20,
    fontSize: 14,
    // height: 15,
    height: 35,
    verticalAlign: "center",
    // maxHeight: 30,
    width: "100%",
    // display: "flex",
    // alignItems: "center",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 120,
    maxWidth: 130,
    width: 140,
  }),
  control: (base) => ({
    ...base,
    height: 35,
    maxWidth: 200,
    width: 140,
    minWidth: 80,
    alignItems: "center",
    position: "relative",
  }),
  option: (base) => ({
    ...base,
    height: 35,
    display: "flex",
    alignItems: "center",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 20,
    height: 35,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  }),
}
/*
<div class="react-select-container">
  <div class="react-select__control">
    <div class="react-select__value-container">...</div>
    <div class="react-select__indicators">...</div>
  </div>
  <div class="react-select__menu">
    <div class="react-select__menu-list">
      <div class="react-select__option">...</div>
    </div>
  </div>
</div>
*/
