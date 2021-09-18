
import React from 'react'

export class BaseComp extends React.Component {
    setStateSync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }
}