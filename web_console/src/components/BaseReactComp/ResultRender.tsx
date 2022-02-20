import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface ByzerExecuteResponse {
    schema: { fields: Array<{ name: string, type: string }> },
    data: Array<Object>
}


export interface ByzerContent {
    mime: string,
    content: any
}

const isByzerExecuteResponse = (res: any): boolean => {
    return typeof res === "object" && res.schema && res.data
}

export const toUnifyFormat = (res: any): ByzerExecuteResponse => {
    if (isByzerExecuteResponse(res)) return res
    let data = res
    if (!Array.isArray(data)) {
        data = [data]
    }

    let newData = data as any[]
    let maxSize = 0
    let maxSizeItem = {}
    newData.forEach(item => {
        const wow = Object.keys(item).length
        if (wow > maxSize) {
            maxSize = wow
            maxSizeItem = item
        }
    })
    const columns = Object.keys(maxSizeItem) || []
    const finalData = newData.map(item => {
        columns.forEach((col, index) => {
            const value = item[col]
            if ((typeof value) === 'boolean') {
                item[col] = value.toString()
            }
            if (Array.isArray(value)) {
                item[col] = value.join(",").substring(0, 300)
            }
            if ((typeof value) === 'object') {
                item[col] = JSON.stringify(value).substring(0, 300)
            }
        })
        return item
    })
    return {
        schema: {
            fields: columns.map(item => {
                    return {name: item, "type": ""}
                }
            )
        },
        data: finalData
    }
}

const toByzerContent = (res: ByzerExecuteResponse): ByzerContent => {
    const mimeOpt = res.schema.fields.filter(item => item.name === "mime")
    const contentOpt = res.schema.fields.filter(item => item.name === "content")
    if (mimeOpt.length !== 0 && contentOpt.length !== 0) {
        const value = res.data[0] as ByzerContent
        return value
    } else {
        return {mime: "json", content: res}
    }

}


const generateTable = (columns: string[], rows: any[]) => {
    const classes = makeStyles({
        table: {
            minWidth: 650,
        }
    }) as any

    const tableHeaders = columns.map(item => {
        return <TableCell>{item}</TableCell>
    })

    const tableRows = rows.map((row) => {
        const tableRow = columns.map(col => {
            return <TableCell component="th" scope="row">{row[col]}</TableCell>
        })
        return <TableRow>
            {tableRow}
        </TableRow>
    })

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

type ResultRenderProps = {
    renderData: any
}

export function ResultRender({renderData}: ResultRenderProps) {
    if (!renderData) {
        return <div></div>
    }
    const data = toByzerContent(toUnifyFormat(renderData))

    if (data.mime === "html") {
        const htmlContent = data.content as string
        let height = "600px"

        return <iframe
            sandbox="allow-scripts"
            style={{width: '100%', height: `${height}`, border: "none", overflow: "hidden"}}
            srcDoc={htmlContent}
        />
    }
    if (data.mime === "image") {
        return <img src={`data:image/png;base64,${data.content}`}/>
    }
    return generateTable(data.content.schema.fields.map((item:{name:string})=>item.name), data.content.data)
}