/// <reference types="react-scripts" />

declare module "react-select/async" {
  import Async from "react-select/lib/Async";
  export * from "react-select/lib/Async";
  export default Async;
}

declare module "prop-types" {
    import PropTypes from "prop-types";
    export * from "@types/prop-types"
    export default PropTypes;
}