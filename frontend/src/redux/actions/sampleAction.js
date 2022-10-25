import axios from "axios"
const { REQUIRE_SAMPLE_CONSTANT, SAMPLE_CONSTANT_SUCCESS, SAMPLE_CONSTANT_FAIL } = require("../constants/sampleConstant");

const host = "http://localhost:5000";

export const getSample = () => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_SAMPLE_CONSTANT
        })
        
        const link = `${host}/api/v1/sampleURL`
        const {data} = await axios.get(link);

        dispatch({
            type: SAMPLE_CONSTANT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SAMPLE_CONSTANT_FAIL,
            payload: error
        })
    }
}