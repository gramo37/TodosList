const { REQUIRE_SAMPLE_CONSTANT, SAMPLE_CONSTANT_SUCCESS, SAMPLE_CONSTANT_FAIL } = require("../constants/sampleConstant");

export const sampleReducer = (state = { message: "", data: {} }, action) => {
  switch (action.type) {
    case REQUIRE_SAMPLE_CONSTANT:
      return {
        message: "SAMPLE CONSTANT TRIGGERED"
      };
    case SAMPLE_CONSTANT_SUCCESS:
      return {
        message: "SAMPLE CONSTANT SUCCESS",
        data: action.payload
      };
    case SAMPLE_CONSTANT_FAIL:
      return {
        message: "SAMPLE CONSTANT FAIL",
        data: action.payload
      };
    default:
        return {
            ...state
        }
  }
};
