import * as React from "react";
import { Label } from "react-bootstrap";

export interface HelloProps { name: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <Label bsStyle="success">Hello {this.props.name}</Label>;
    }
}
