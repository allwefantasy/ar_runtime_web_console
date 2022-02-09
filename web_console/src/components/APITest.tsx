import * as React from "react";

export type TestProps = {
    name: string
}
export default function APITest(props: TestProps) {
    return <div>
        hello {props.name}
    </div>
}