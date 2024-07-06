import React from "react";

const Form: React.FC<React.PropsWithChildren<{
    actionTo: string;
}>> = (props) => {
    return (
        <form action={props.actionTo}>
            {props.children}
        </form>
    )
}

export default Form;
