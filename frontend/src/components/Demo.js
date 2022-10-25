import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSample } from "../redux/actions/sampleAction";

const Demo = () => {
  const sample = useSelector((state) => state.sample);
  const dispatch = useDispatch();

  // print sample whenever changed
    useEffect(()=>{
        console.log(sample);
    }, [sample])

  const clickHandler = () => {
    dispatch(getSample());
  };

  return (
    <>
      Hello
      <button onClick={clickHandler}>Click Me</button>
    </>
  );
};

export default Demo;
