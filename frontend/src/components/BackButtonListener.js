import React from "react";

const BackButtonListener = (props) => {
  const [pressed, setPressed] = React.useState(false);
  React.useEffect(() => {
    window.onpopstate = (e) => {
      setPressed(true);
      props.runThisFunc();
    };
  });
  return <h3>Back button: {pressed.toString()}</h3>;
};

export default BackButtonListener;
