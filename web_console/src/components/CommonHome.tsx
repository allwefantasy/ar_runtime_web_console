import * as React from "react";

export type TestProps = {
    name: string
}
export default function CommonHome(props: TestProps) {
    return <div className="flex flex-row w-full">
        <div className="w-full h-24 bg-slate-100 rounded-xl bg-slate-100">abc</div>
        <div className="w-full border-0 border-amber-800"></div>
        <div className="w-full border-0 border-amber-800"></div>
    </div>
}